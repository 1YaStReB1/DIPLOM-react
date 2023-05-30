import React, { useRef, useState } from "react";
import video2 from "../../assets/videos/19.mp4";
import "../../styles/OpticalFlow/opticalFlow.scss";
import { loadVideo } from "./loadVideos";

const OpticalFlow = () => {
  const videoRef = useRef();
  const [video, setVideo] = useState(null);
  const [opticalFlow, setOpticalFlow] = useState(null);

  const openVideoButton = () => {
    videoRef.current.click();
    console.log(videoRef.current);
  };

  const handleChange = (e) => {
    setOpticalFlow(e.target.files[0]);

    if (!e.target.files.length) {
      return;
    }
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      setVideo(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const gandleUpload = async (e) => {
    if (!opticalFlow) {
      alert("Не выбрано");
      return;
    }

    const formData = new FormData();
    formData.append("file", opticalFlow);
    const res = await fetch("http://127.0.0.1:5000/download", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const videoData = await res.blob();
    const video = URL.createObjectURL(videoData);
    setVideo(URL.createObjectURL(videoData));
  };

  return (
    <>
      <div className="load_videos">
        <input
          ref={videoRef}
          id="video-input"
          type="file"
          name="name"
          accept="video/mp4"
          onChange={(e) => handleChange(e)}
        />
        <button
          className="load_videos--btn"
          onClick={(e) => {
            openVideoButton(e);
          }}
        >
          +
        </button>
        <button
          className="load_videos--btn"
          onClick={(e) => {
            gandleUpload(video);
          }}
        >
          Получить оптический поток
        </button>
      </div>
      <div className="result_video">
        <div className="text">Вывод результата</div>
        <video
          className="video"
          controls
          src={video}
          title="video player"
        ></video>
      </div>
    </>
  );
};

export default OpticalFlow;
