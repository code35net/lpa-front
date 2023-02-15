import React, { useMemo, useRef, useState, useEffect } from "react";
import PolygonAnnotation from "../components/PolygonAnnotation";
import { Stage, Layer, Image } from "react-konva";
import Button from "../components/Button";
const videoSource = "./space_landscape.jpg";
const wrapperStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: 20,
  backgroundColor: "aliceblue",
};
const columnStyle = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 20,
  backgroundColor: "aliceblue",
};
const Canvas = (props) => {
    const {
        points,
        setPoints,
        imageSource,
        isPolyComplete,
        setPolyComplete,
        hasThread,
    } = props;
    const [position, setPosition] = useState([0, 0]);
  const [image, setImage] = useState();
  const imageRef = useRef(null);
  const dataRef = useRef(null);
  const [size, setSize] = useState({});
  const [flattenedPoints, setFlattenedPoints] = useState();
  const [isMouseOverPoint, setMouseOverPoint] = useState(false);
   //it may come from redux so it may be dependency that's why I left it as dependecny...

  const videoElement = new window.Image();
    useEffect(() => {
        console.log(imageSource)
          videoElement.width = 650;
          videoElement.height = 302;
        videoElement.src = imageSource;
        console.log(imageSource);
      setSize({
        width: videoElement.width,
        height: videoElement.height,
      });
      setImage(videoElement);
      imageRef.current = videoElement;
    }, [imageSource]);
  const getMousePos = (stage) => {
      return [parseInt(stage.getPointerPosition().x), parseInt(stage.getPointerPosition().y)];
  };
  //drawing begins when mousedown event fires.
  const handleMouseDown = (e) => {
    if (isPolyComplete) return;
    const stage = e.target.getStage();
    const mousePos = getMousePos(stage);
    if (isMouseOverPoint && points.length >= 3) {
      setPolyComplete(true);
    } else {
        if (hasThread)  setPoints([...points, mousePos]);
    }
  };
  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
      const mousePos = getMousePos(stage);
      console.log()
    if(hasThread) setPosition(mousePos);
  };
  const handleMouseOverStartPoint = (e) => {
    if (isPolyComplete || points.length < 3) return;
    e.target.scale({ x: 3, y: 3 });
      if (hasThread) setMouseOverPoint(true);
  };
  const handleMouseOutStartPoint = (e) => {
    e.target.scale({ x: 1, y: 1 });
      if (hasThread) setMouseOverPoint(false);
  };
  const handlePointDragMove = (e) => {
    const stage = e.target.getStage();
    const index = e.target.index - 1;
    const pos = [e.target._lastPos.x, e.target._lastPos.y];
    if (pos[0] < 0) pos[0] = 0;
    if (pos[1] < 0) pos[1] = 0;
    if (pos[0] > stage.width()) pos[0] = stage.width();
    if (pos[1] > stage.height()) pos[1] = stage.height();
      if (hasThread) setPoints([...points.slice(0, index), pos, ...points.slice(index + 1)]);
  };

  useEffect(() => {
      if (hasThread) setFlattenedPoints(
      points
            .concat(isPolyComplete ? [] : position)
        .reduce((a, b) => a.concat(b), [])
    );
  }, [points, isPolyComplete, position]);
    const undo = (e) => {
        e.preventDefault();
        if (hasThread) setPoints(points.slice(0, -1));
    setPolyComplete(false);
        if (hasThread) setPosition(points[points.length - 1]);
  };
    const reset = (e) => {
        e.preventDefault();
    setPoints([]);
    setPolyComplete(false);
  };
  const handleGroupDragEnd = (e) => {
    //drag end listens other children circles' drag end event
    //...that's, why 'name' attr is added, see in polygon annotation part
    if (e.target.name() === "polygon") {
      let result = [];
      let copyPoints = [...points];
      copyPoints.map((point) =>
        result.push([point[0] + e.target.x(), point[1] + e.target.y()])
      );
      e.target.position({ x: 0, y: 0 }); //needs for mouse position otherwise when click undo you will see that mouse click position is not normal:)
        if (hasThread) setPoints(result);
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={columnStyle}>
        <Stage
          width={size.width || 650}
          height={size.height || 302}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
        >
          <Layer>
            <Image
              ref={imageRef}
              image={image}
              x={0}
              y={0}
              width={size.width}
              height={size.height}
            />
            <PolygonAnnotation
              points={points}
              flattenedPoints={flattenedPoints}
              handlePointDragMove={handlePointDragMove}
              handleGroupDragEnd={handleGroupDragEnd}
              handleMouseOverStartPoint={handleMouseOverStartPoint}
              handleMouseOutStartPoint={handleMouseOutStartPoint}
              isFinished={isPolyComplete}
            />
          </Layer>
        </Stage>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
                  {hasThread && (<Button name="Undo" onClick={undo} />)}
                  {hasThread && (<Button name="Reset" onClick={reset} />)}
        </div>
      </div>
      <div
        ref={dataRef}
        style={{
          width: 375,
          height: 302,
          boxShadow: ".5px .5px 5px .4em rgba(0,0,0,.1)",
          marginTop: 20,
        }}
      >
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(points)}</pre>
      </div>
    </div>
  );
};

export default Canvas;
