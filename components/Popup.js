import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import moment from 'moment';

export default function Popup({
    show,
    onHide,
    isDiaryModal,
    isEditModal,
    isViewModal,
    newPost,
    setNewPost,
    handleSubmit,
    handleDelete,
    handleEdit }) {
    return (
        <Modal show={show} onHide={onHide} scrollable={true} animation={false} dialogClassName="diary">
            {isDiaryModal && <Modal.Header closeButton>
                <Modal.Title>Record Post</Modal.Title>
            </Modal.Header>}
            {isEditModal && <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>}
            {isViewModal && <Modal.Header closeButton>
                <Modal.Title>View Post</Modal.Title>
            </Modal.Header>}
            {(isDiaryModal || isEditModal) && <Modal.Body>
                <Form>
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>Post Title:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter post title..." value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="date">
                                    <Form.Label>Date:</Form.Label>
                                    <Form.Control type="date" value={moment(newPost.date).format("YYYY-MM-DD")} onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="entry">
                                <Form.Label>Entry:</Form.Label>
                                <Form.Control as="textarea" rows={10} value={newPost.entry} onChange={(e) => setNewPost({ ...newPost, entry: e.target.value })} />
                            </Form.Group>
                        </Row>
                        <Row>
                            {isEditModal && <Col xs={6}>
                                <Button variant='danger' onClick={handleDelete}>Delete Post</Button>
                            </Col>
                            }
                            {isEditModal && <Col xs={6}>
                                <Button className="float-end" variant="success" onClick={handleSubmit}>Enter</Button>
                            </Col>}
                            {isDiaryModal && <Col xs={{span: 3, offset: 9}}>
                                <Button className="float-end" variant="success" onClick={handleSubmit}>Enter</Button>
                            </Col>}
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>}
            {isViewModal && <Modal.Body>
                <Container>
                    <Card>
                        <Card.Header>Diary Entry</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={6}>
                                    <strong>Title:</strong> {newPost.title}
                                </Col>
                                <Col xs={6}>
                                    <strong>Date:</strong> {moment(newPost.date).format("YYYY/MM/DD")}
                                </Col>
                            </Row>
                            <Row>
                                <strong>Entry:</strong> <p>{newPost.entry}</p>
                            </Row>
                        </Card.Body>
                    </Card>
                    <p></p>
                    <Button className="float-end" variant="primary" onClick={handleEdit}>Edit Post</Button>
                </Container>
            </Modal.Body>}
        </Modal>
    )
}