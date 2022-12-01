import { useEffect, useState, useCallback, useRef } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Popup from "../components/Popup";

const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events = [];
let oldTitle;
let oldDate;

export default function Home() {
  const [allEvents, setAllEvents] = useState(events);
  const [newPost, setNewPost] = useState({ title: "", date: "", entry: "" });
  const [showDiaryForm, setShowDiaryForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);
  const clickRef = useRef(null)

  const handleDiaryFormShow = () => setShowDiaryForm(true);
  const handleEditFormShow = () => setShowEditForm(true);
  const handleViewFormShow = () => setShowViewForm(true);

  const handleDiaryFormClose = () => {
    setNewPost({ title: "", date: "", entry: "" });
    setShowDiaryForm(false);
  }
  const handleEditFormClose = () => {
    setNewPost({ title: "", date: "", entry: "" });
    setShowEditForm(false);
  }
  const handleViewFormClose = () => {
    setNewPost({ title: "", date: "", entry: "" });
    setShowViewForm(false);
  }

  function handleNewPost(e) {
    e.preventDefault();
    newPost.date = moment(newPost.date).toDate();
    setAllEvents([...allEvents, newPost]);
    handleDiaryFormClose();
  }

  function handleUpdatePost(e) {
    e.preventDefault();
    for (let i = 0; i < allEvents.length; i++) {
      if (allEvents[i].title == oldTitle && allEvents[i].date == oldDate) {
        allEvents.splice(i, 1);
        break;
      }
    }
    newPost.date = moment(newPost.date).toDate();
    setAllEvents([...allEvents, newPost]);
    handleEditFormClose();
  }

  function handleEdit() {
    setShowViewForm(false);
    handleEditFormShow();
    oldTitle = newPost.title;
    oldDate = newPost.date;
  }

  function handleDelete() {
    for (let i = 0; i < allEvents.length; i++) {
      if (allEvents[i].title == oldTitle && allEvents[i].date == oldDate) {
        allEvents.splice(i, 1);
        break;
      }
    }
    handleEditFormClose();
  }

  const onDoubleClickEvent = useCallback((e) => {
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      handleEditFormShow();
      oldTitle = e.title;
      oldDate = e.date;
      setNewPost(e);
    }, 250)
  }, [])

  const onSelectEvent = useCallback((e) => {
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      handleViewFormShow();
      setNewPost(e);
    }, 250)
  }, [])

  useEffect(() => {
    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            Web Diary
          </Navbar.Brand>
          <Button variant="primary" onClick={handleDiaryFormShow}>
            Create Post
          </Button>
        </Container>
      </Navbar>
      <Popup
        show={showDiaryForm}
        onHide={handleDiaryFormClose}
        isDiaryModal={true}
        newPost={newPost}
        setNewPost={setNewPost}
        handleSubmit={handleNewPost}
      />
      <Popup
        show={showEditForm}
        onHide={handleEditFormClose}
        isEditModal={true}
        newPost={newPost}
        setNewPost={setNewPost}
        handleSubmit={handleUpdatePost}
        handleDelete={handleDelete}
      />
      <Popup
        show={showViewForm}
        onHide={handleViewFormClose}
        isViewModal={true}
        newPost={newPost}
        handleEdit={handleEdit}
      />
      <Calendar
        localizer={localizer}
        events={allEvents}
        titleAccessor="title"
        startAccessor="date"
        endAccessor="date"
        onSelectEvent={(e) => onSelectEvent(e)}
        onDoubleClickEvent={(e) => onDoubleClickEvent(e)}
        style={{ height: 500, margin: "50px", "z-index": -1 }}
      />
    </div>
  )
}