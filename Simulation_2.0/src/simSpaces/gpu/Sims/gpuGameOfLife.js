class GpuGameOfLife{

    static GRID_SIZE = 100;
    static CELL_SIZE = .25;
    static GRID_SIZE_X = Math.floor(canvas.width/CELL_SIZE);
    static GRID_SIZE_Y = Math.floor(canvas.height/CELL_SIZE);

    /* console.log("cells wide = " + GRID_SIZE_X + ", cells high = " + GRID_SIZE_Y);
    console.log("total simulated cell = " + GRID_SIZE_X * GRID_SIZE_Y) */

    static UPDATE_INTERVAL = 0; // Update every 200ms (5 times/sec)
    static WORKGROUP_SIZE = 8;

    let step = 0; // Track how many simulation steps have been run
    let frames = 0;
    let lastTime = performance.now();
    let fps = 0;


                                                            //TO ADD PERFORMANCE UNCOMMENT
    const adapter = await navigator.gpu.requestAdapter(/*{powerPreference: "high-performance"}*/);
    if (!adapter) {
        throw new Error("No appropriate GPUAdapter found.");
    }

    const device = await adapter.requestDevice();

    const context = canvas.getContext("webgpu");
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device: device,
        format: canvasFormat,
    });

    const vertices = new Float32Array([
    //   X,    Y,
        -1, -1, // Triangle 1 (Blue)
        1, -1,
        1,  1,

        -1, -1, // Triangle 2 (Red)
        1,  1,
        -1,  1,
    ]);

    const vertexBuffer = device.createBuffer({
        label: "Cell vertices",
        size: vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(vertexBuffer, /*bufferOffset=*/0, vertices);

    // Create a uniform buffer that describes the grid.
    const uniformArray = new Float32Array([GRID_SIZE_X, GRID_SIZE_Y]);

    const uniformBuffer = device.createBuffer({
        label: "Grid Uniforms",
        size: uniformArray.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(uniformBuffer, 0, uniformArray);

    // Create an array representing the active state of each cell.
    const cellStateArray = new Uint32Array(GRID_SIZE_X * GRID_SIZE_Y);

    const cellStateStorage = [
        device.createBuffer({
            label: "Cell State A",
            size: cellStateArray.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        }),
        device.createBuffer({
            label: "Cell State B",
            size: cellStateArray.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        })
    ];


    // Set each cell to a random state, then copy the JavaScript array into the storage buffer.
    for (let i = 0; i < cellStateArray.length; ++i) {
    cellStateArray[i] = Math.random() > 0.5 ? 1 : 0;
    }
    device.queue.writeBuffer(cellStateStorage[0], 0, cellStateArray);


    /*
    // Mark every third cell of the grid as active.
    for (let i = 0; i < cellStateArray.length; i += 3) {
        cellStateArray[i] = 1;
    }
    device.queue.writeBuffer(cellStateStorage[0], 0, cellStateArray);

    // Mark every other cell of the second grid as active.
    for (let i = 0; i < cellStateArray.length; i++) {
    cellStateArray[i] = i % 2;
    }
    device.queue.writeBuffer(cellStateStorage[1], 0, cellStateArray);
    */

    const vertexBufferLayout = {
        arrayStride: 8,
        attributes: [{
            format: "float32x2",
            offset: 0,
            shaderLocation: 0, // Position, see vertex shader
        }],
    };

    // Create the bind group layout and pipeline layout.
    const bindGroupLayout = device.createBindGroupLayout({
        label: "Cell Bind Group Layout",
        entries: [{
            binding: 0,
            visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT,
            buffer: {type: "uniform"} // Grid uniform buffer
        }, {
            binding: 1,
            visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE,
            buffer: { type: "read-only-storage"} // Cell state input buffer
        }, {
            binding: 2,
            visibility: GPUShaderStage.COMPUTE,
            buffer: { type: "storage"} // Cell state output buffer
        }]
    });

    const pipelineLayout = device.createPipelineLayout({
        label: "Cell Pipeline Layout",
        bindGroupLayouts: [ bindGroupLayout ],
    });

    const simulationShaderModule = device.createShaderModule({
        label: "Game of Life simulation shader",
        code: `
            @group(0) @binding(0) var<uniform> grid: vec2f;

            @group(0) @binding(1) var<storage> cellStateIn: array<u32>;
            @group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;

            fn cellIndex(cell: vec2u) -> u32 {
                return (cell.y % u32(grid.y)) * u32(grid.x) + (cell.x % u32(grid.x));
            }

            fn cellActive(x: u32, y: u32) -> u32 {
                return cellStateIn[cellIndex(vec2(x, y))];
            }


            @compute @workgroup_size(${WORKGROUP_SIZE}, ${WORKGROUP_SIZE})
            fn computeMain(@builtin(global_invocation_id) cell: vec3u) {
                let activeNeighbors = cellActive(cell.x+1, cell.y+1) +
                                        cellActive(cell.x+1, cell.y) +
                                        cellActive(cell.x+1, cell.y-1) +
                                        cellActive(cell.x, cell.y-1) +
                                        cellActive(cell.x-1, cell.y-1) +
                                        cellActive(cell.x-1, cell.y) +
                                        cellActive(cell.x-1, cell.y+1) +
                                        cellActive(cell.x, cell.y+1);

                let i = cellIndex(cell.xy);

                // Conway's game of life rules:
                switch activeNeighbors {
                case 2: { // Active cells with 2 neighbors stay active.
                    cellStateOut[i] = cellStateIn[i];
                }
                case 3: { // Cells with 3 neighbors become or stay active.
                    cellStateOut[i] = 1;
                }
                default: { // Cells with < 2 or > 3 neighbors become inactive.
                    cellStateOut[i] = 0;
                }
                }
            }`
    });

    const cellShaderModule = device.createShaderModule({
        label: "Cell shader",
        code: `

            struct VertexInput {
                @location(0) pos: vec2f,
                @builtin(instance_index) instance: u32,
            };

            struct VertexOutput {
                @builtin(position) pos: vec4f,
                @location(0) cell: vec2f,
            };

            @group(0) @binding(0) var<uniform> grid: vec2f;
            @group(0) @binding(1) var<storage> cellState: array<u32>;


            @vertex
            fn vertexMain(input: VertexInput) -> VertexOutput  {

                let i = f32(input.instance);
                let cell = vec2f(i % grid.x, floor(i / grid.x));

                let state = f32(cellState[input.instance]);

                let cellOffset = cell / grid * 2;
                let gridPos = (input.pos*state + 1) / grid - 1 + cellOffset;

                var output: VertexOutput;
                output.pos = vec4f(gridPos, 0, 1);
                output.cell = cell;
                return output;
            }
            
            struct FragInput {
                @location(0) cell: vec2f,
            };

            @fragment
            fn fragmentMain(input: FragInput) -> @location(0) vec4f {
            let c = input.cell / grid;
            //return vec4f(0.1607, 0.3098, 0.5529, 1);
            return vec4f(c, .5, 1);
            }
            `
    });

    const cellPipeline = device.createRenderPipeline({
        label: "Cell pipeline",
        layout: pipelineLayout,
        vertex: {
            module: cellShaderModule,
            entryPoint: "vertexMain",
            buffers: [vertexBufferLayout]
    },
        fragment: {
            module: cellShaderModule,
            entryPoint: "fragmentMain",
            targets: [{
                format: canvasFormat
            }]
        }
    });

    const simulationPipeline = device.createComputePipeline({
        label: "Simulation pipeline",
        layout: pipelineLayout,
        compute: {
            module: simulationShaderModule,
            entryPoint: "computeMain",
        }
    });

    const bindGroups = [
        device.createBindGroup({
            label: "Cell renderer bind group A",
            layout: bindGroupLayout,
            entries: [{
                binding: 0,
                resource: { buffer: uniformBuffer }
            }, {
                binding: 1,
                resource: { buffer: cellStateStorage[0] }
            }, {
                binding: 2,
                resource: { buffer: cellStateStorage[1] }
            }],
        }),
        device.createBindGroup({
            label: "Cell renderer bind group B",
            layout: bindGroupLayout,
            entries: [{
                binding: 0,
                resource: { buffer: uniformBuffer }
            }, {
                binding: 1,
                resource: { buffer: cellStateStorage[1] }
            }, {
                binding: 2,
                resource: { buffer: cellStateStorage[0] }
            }],
        })
    ];


    function updateGrid() {

        //frames++;

        const encoder = device.createCommandEncoder();

        const computePass = encoder.beginComputePass();

        computePass.setPipeline(simulationPipeline);
        computePass.setBindGroup(0, bindGroups[step % 2]);

        const workgroupCount_x = Math.ceil(GRID_SIZE_X / WORKGROUP_SIZE);
        const workgroupCount_y = Math.ceil(GRID_SIZE_Y / WORKGROUP_SIZE);
        computePass.dispatchWorkgroups(workgroupCount_x, workgroupCount_y);

        computePass.end();

        step++; // Increment the step count
        
        // Start a render pass 
        const pass = encoder.beginRenderPass({
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                loadOp: "clear",
                //clearValue: { r: 171/255, g: 38/255, b: 44/255, a: 1 },
                clearValue: { r: 0, g: 0, b: 0, a: 1.0 },
                storeOp: "store",
            }]
        });

        // Draw the grid.
        pass.setPipeline(cellPipeline);
        pass.setBindGroup(0, bindGroups[step % 2]); // Updated!
        pass.setVertexBuffer(0, vertexBuffer);
        pass.draw(vertices.length / 2, GRID_SIZE_X * GRID_SIZE_Y);

        // End the render pass and submit the command buffer
        pass.end();
        device.queue.submit([encoder.finish()]);
    }

    // Schedule updateGrid() to run repeatedly
    //setInterval(updateGrid, UPDATE_INTERVAL);

    function frame() {
        frames++;

        const now = performance.now();
        const delta = now - lastTime;

        if (delta >= 100) { // update once per second
            fps = (frames * 1000) / delta;
            fpsCounter.textContent = `FPS: ${fps.toFixed(2)}`;
            frames = 0;
            lastTime = now;
        }

        updateGrid(); // run your simulation + draw
        requestAnimationFrame(frame);
    }

    frame();

}