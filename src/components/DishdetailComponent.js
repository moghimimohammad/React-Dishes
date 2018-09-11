import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderDish(dish) {
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

    renderComments(comments) {
    	return comments.map(comment => {
    		return (
    			<ul className="list-unstyled">
					<li>{comment.comment}</li>
					<li>{`-- ${comment.author}, ${comment.date}`}</li>
    			</ul>
	    	);
    	});	    	
    }

    render() {
    	const { dish } = this.props;
    	if(dish != null) {
    		console.log('hrer');
			return (
	            <div className="row">
	              <div  className="col-12 col-md-5 m-1">
	                {this.renderDish(dish)}
	              </div>
	              <div  className="col-12 col-md-5 m-1">
	              	<h4>Comments</h4>
	                {this.renderComments(dish.comments)}
	              </div>
	            </div>
	        );
    	} else {
    		return (<div></div>);
    	}
    }
}

export default DishDetail;



				