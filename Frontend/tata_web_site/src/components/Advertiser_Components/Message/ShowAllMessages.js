import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import fetchCollaboration from "../ManageComponents/fetchCollaboration";
import io from "socket.io-client";
import { useRef, useState, useEffect } from "react";
import getMessage from "./getMessage";
import { bufferToBase64 } from "../../../utils";
import defaultImage from "../default.jpg";

var socket = io.connect("http://localhost:3002");

export default function App() {
  const hashMap = {
    key1: "value1",
  };
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [messageList, setMessageListe] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [color, setColor] = useState("");
  const [room_idd, setRoom] = useState("");
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const user_id = cookies.get("user_id");
  const user_name = cookies.get("user_name");
  const [message, setMessage] = useState("");
  const [idLast, setID] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const setMessageList = (e) => {
    setMessage(e.target.value);
  };
  const messageData = useQuery(["message", token, room_idd], getMessage, {
    enabled: shouldFetch,
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList]);
  useEffect(() => {
    if (messageData.isSuccess && messageData.data.messages) {
      const oldMessages = messageData.data.messages.map((msg) => ({
        user: msg.user_name,
        message: msg.message_body,
      }));
      setMessageListe(oldMessages);
    }
  }, [messageData.isSuccess, messageData.data]);

  useEffect(() => {
    const handleMessageReceive = (data) => {
      if (data.user !== user_name) {
        setMessageListe((list) => [...list, data]);
      }
    };

    socket.on("receive_message", handleMessageReceive);

    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, [socket, user_name]); // Include user_name in the dependency array

  const result = useQuery(
    ["collaboration", user_id, token],
    fetchCollaboration
  );

  if (result.isLoading) {
    return (
      <MDBSpinner role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }
  const collaborations = result.data;
  const myImage = collaborations.proposal[0].belongToUser.user_image
    ? `data:image/jpeg;base64,${bufferToBase64(
        collaborations.proposal[0].belongToUser.user_image.data
      )}`
    : defaultImage; // Provide a placeholder image
  for (var i = 0; i < collaborations.proposal.length; i++) {
    hashMap[collaborations.proposal[i].user.user_name] = collaborations
      .proposal[i].user.user_image
      ? bufferToBase64(collaborations.proposal[i].user.user_image.data)
      : defaultImage;
  }
  const joinRoom = async (id) => {
    var colorTest = "red";
    setColor(colorTest);
    setMessageListe([]);
    setRoom(id);
    setSelectedId(id);
    setShouldFetch(true);
    await socket.emit("join_room", {
      user: user_id,
      user_name: user_name,
      room: id,
    });
    setID(id);
    if (messageData.isLoading) {
      return (
        <MDBSpinner role="status">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      );
    }

    console.log("message", messageData.data.messages);
    const oldMessages = messageData.data.messages.map((msg) => ({
      user: msg.user_name,
      message: msg.message_body,
    }));
    console.log("oldMessage", oldMessages);
    setMessageListe((list) => [...list], oldMessages);
  };

  const sendMessage = async () => {
    const newMessage = {
      user: user_name,
      message: message,
      room: room_idd,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    await socket.emit("send_message", newMessage);
    const formData = {
      collaboration_id: room_idd,
      user_name: user_name,
      message_body: message,
    };
    // Add the message to the list when sending
    setMessageListe((list) => [...list, newMessage]);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`http://localhost:3001/api/createMessage`, formData, { headers })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(collaborations);
  // console.log(messageList);
  // console.log("image", collaborations.proposal[0].belongToUser.user_image);

  return (
    <MDBContainer
      fluid
      className="py-5"
      style={{ backgroundColor: "#eee", width: "%100" }}
    >
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            Collaborations
          </h5>

          <MDBCard>
            <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
              {!collaborations.proposal.length ? (
                <h1>No collaborations yet</h1>
              ) : (
                collaborations.proposal.map((collab) => (
                  <MDBCardBody
                    onClick={() => {
                      joinRoom(collab.collaboration_id);
                    }}
                  >
                    <MDBTypography listUnStyled className="mb-0">
                      <li
                        style={{
                          backgroundColor:
                            collab.collaboration_id === selectedId
                              ? "#D0D0D0	"
                              : "white",
                        }}
                        className="p-2 border-bottom"
                      >
                        <a href="#!" className="d-flex justify-content-between">
                          <div className="d-flex flex-row">
                            <img
                              src={
                                collab.user.user_image
                                  ? `data:image/jpeg;base64,${bufferToBase64(
                                      collab.user.user_image.data
                                    )}`
                                  : defaultImage // Provide a placeholder image
                              }
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">
                                {collab.user.name} - {collab.user.email}
                              </p>
                              <p className="small text-muted">
                                {collab.belongToCampaign.campaign_description}
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    </MDBTypography>
                  </MDBCardBody>
                ))
              )}
            </div>
          </MDBCard>
        </MDBCol>

        <MDBCol md="6" lg="7" xl="8">
          <MDBTypography listUnStyled>
            <div
              style={{ maxHeight: "70vh", overflowY: "auto" }}
              ref={scrollRef}
            >
              {" "}
              {messageList.map((val, index) => (
                <MDBRow key={index}>
                  {" "}
                  {val.user ===
                  collaborations.proposal[0].belongToUser.user_name ? (
                    <MDBCol>
                      <li className="justify-content-between mb-4">
                        <div className="d-flex justify-content-end mb-0">
                          <img
                            src={myImage}
                            alt="avatar"
                            className="rounded-circle me-3 shadow-1-strong"
                            width="60"
                            style={{
                              marginBottom: "5px",
                            }}
                          />
                        </div>
                        <MDBCard>
                          <MDBCardHeader className="d-flex justify-content-between p-3">
                            <p className="fw-bold mb-0">{val.user}</p>
                            <p className="text-muted small mb-0">
                              <MDBIcon far icon="clock" /> {val.created_at}
                            </p>
                          </MDBCardHeader>
                          <MDBCardBody>
                            <p className="mb-0">{val.message}</p>
                          </MDBCardBody>
                        </MDBCard>
                      </li>
                    </MDBCol>
                  ) : (
                    <MDBCol>
                      <li className="justify-content-between mb-4">
                        <img
                          src={hashMap[val.user]}
                          alt="avatar"
                          className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                          width="60"
                          style={{ marginBottom: "10px" }}
                        />

                        <MDBCard>
                          <MDBCardHeader className="d-flex justify-content-between p-3">
                            <p className="fw-bold mb-0">{val.user}</p>
                            <p className="text-muted small mb-0">
                              <MDBIcon far icon="clock" /> {val.created_at}
                            </p>
                          </MDBCardHeader>
                          <MDBCardBody>
                            <p className="mb-0">{val.message}</p>
                          </MDBCardBody>
                        </MDBCard>
                      </li>
                    </MDBCol>
                  )}
                </MDBRow>
              ))}
            </div>
            <MDBRow style={{ marginTop: "40px" }}>
              <MDBCard style={{ marginRight: "20px" }}>
                <MDBCardBody>
                  <li className="bg-white mb-3">
                    <MDBTextArea
                      onChange={setMessageList}
                      label="Message"
                      id="textAreaExample"
                      rows={4}
                    />
                  </li>
                  <MDBCol>
                    <MDBBtn
                      onClick={sendMessage}
                      color="info"
                      rounded
                      className="float-end"
                    >
                      Send
                    </MDBBtn>
                  </MDBCol>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
