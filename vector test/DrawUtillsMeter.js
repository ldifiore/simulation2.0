class DrawUtillsMeter{
    static drawPoint(position, radius, color){
        c.beginPath();
        c.arc(position.x/pixelSize,position.y/pixelSize,radius/pixelSize,0,Math.PI*2, true);
        c.fillStyle = color;
        c.fill();
        c.closePath();
    }

    static strokePoint(position, radius, color){
        c.beginPath();
        c.arc(position.x/pixelSize,position.y/pixelSize,radius/pixelSize,0,Math.PI*2, true);
        c.strokeStyle = color;
        c.stroke();
        c.closePath();
    }

    static drawLine(startposition, endposition, color){
        c.beginPath();
        c.moveTo(startposition.x/pixelSize, startposition.y/pixelSize);
        c.lineTo(endposition.x/pixelSize, endposition.y/pixelSize);
        c.strokeStyle = color;
        c.stroke();
        c.closePath();
    }

    static drawText(position, size, color, text){
        c.font = size+'px Arial';
        c.fillStyle = color
        c.fillText(text, position.x/pixelSize, position.y/pixelSize);
    }

    static drawPositionArrow(startposition, arrowheadPosition, color){

        let direction = SUB(arrowheadPosition, startposition);
        direction.Normalize();
        let arrowheadCenter = SUB(arrowheadPosition, SCALE(direction,20));

        let directionArrowhead = direction.getNormal();

        let leftArrowheadPosition = ADD(arrowheadCenter, SCALE(directionArrowhead, 10));
        let rightArrowheadPosition = SUB(arrowheadCenter, SCALE(directionArrowhead, 10));

        this.drawLine(startposition, arrowheadCenter, color);
        //this.drawLine(leftArrowheadPosition, arrowheadPosition, color);
        //this.drawLine(rightArrowheadPosition, arrowheadPosition, color);

        c.beginPath();
        c.moveTo(leftArrowheadPosition.x/pixelSize, leftArrowheadPosition.y/pixelSize);
        c.lineTo(arrowheadPosition.x/pixelSize, arrowheadPosition.y/pixelSize);
        c.lineTo(rightArrowheadPosition.x/pixelSize, rightArrowheadPosition.y/pixelSize);
        c.lineTo(leftArrowheadPosition.x/pixelSize, leftArrowheadPosition.y/pixelSize);
        c.strokeStyle = color;
        c.stroke();
        c.closePath();

    }

    static drawSizeArrow(startposition, arrowheadPosition, size, color){

        let direction = SUB(arrowheadPosition, startposition);
        direction.Normalize();

        arrowheadPosition = ADD( startposition, SCALE(direction, size));


        let arrowheadCenter = SUB(arrowheadPosition, SCALE(direction,size/10));

        let directionArrowhead = direction.getNormal();

        let leftArrowheadPosition = ADD(arrowheadCenter, SCALE(directionArrowhead, size/20));
        let rightArrowheadPosition = SUB(arrowheadCenter, SCALE(directionArrowhead, size/20));

        this.drawLine(startposition, arrowheadCenter, color);
        //this.drawLine(leftArrowheadPosition, arrowheadPosition, color);
        //this.drawLine(rightArrowheadPosition, arrowheadPosition, color);

        c.beginPath();
        c.moveTo(leftArrowheadPosition.x/pixelSize, leftArrowheadPosition.y/pixelSize);
        c.lineTo(arrowheadPosition.x/pixelSize, arrowheadPosition.y/pixelSize);
        c.lineTo(rightArrowheadPosition.x/pixelSize, rightArrowheadPosition.y/pixelSize);
        c.lineTo(leftArrowheadPosition.x/pixelSize, leftArrowheadPosition.y/pixelSize);
        c.fillStyle = color;
        c.fill();
        c.closePath();

    }
}