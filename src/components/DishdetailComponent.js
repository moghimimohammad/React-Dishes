import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Row, Col,  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}) {
	return (
		<Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
	)
}

function RenderComments({comments}) {
	return comments.map(comment => {
		return (
			<ul className="list-unstyled" key={comment.id}>
				<li>{comment.comment}</li>
				<li>{`-- ${comment.author}, ${ new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(comment.date))}`}</li>
			</ul>
    	);
	});	    	
}


const  DishDetail = (props) => {
	const { dish } = props;
	if(dish != null) {
		return (
            <div className="container">
	            <div className="row">
	                <Breadcrumb>

	                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
	                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
	                </Breadcrumb>
	                <div className="col-12">
	                    <h3>{props.dish.name}</h3>
	                    <hr />
	                </div>                
	            </div>
	            <div className="row">
	                <div className="col-12 col-md-5 m-1">
	                    <RenderDish dish={props.dish} />
	                </div>
	                <div className="col-12 col-md-5 m-1">
	                    <RenderComments comments={props.comments} />
	                    <CommentForm />
	                </div>
	            </div>
            </div>
        );
	} else {
		return (<div></div>);
	}
}

class CommentForm extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isModalOpen: false,
	  };

	  this.toggleModal = this.toggleModal.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
          isModalOpen: !this.state.isModalOpen
        });
	}

	handleSubmit(values) {
		console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
	}

	render() {
		return(
			<div>
				<Button outline onClick={this.toggleModal}><i className="fa fa-pencil"></i> Submit Comment</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
	                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
	                <ModalBody>	                	
	                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Ratingg</Label>
                                <Col md={10}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>                                        
                                    </Control.select>                                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be atleast 3 characters',
                                            maxLength: 'Must be 15 numbers or less'
                                        }}
                                     />                                
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        className="form-control"
                                        rows="12"
                                    />                                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
						</LocalForm>
	                </ModalBody>
	            </Modal>
			</div>				
		);
	}
}


export default DishDetail;



				