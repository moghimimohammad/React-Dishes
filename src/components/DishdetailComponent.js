import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';





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
	              <div  className="col-12 col-md-5 m-1">
	                <RenderDish dish={dish} />
	              </div>
	              <div  className="col-12 col-md-5 m-1">
	              	<h4>Comments</h4>
	                <RenderComments comments={dish.comments} />
	              </div>
	            </div>
			</div>		            
        );
	} else {
		return (<div></div>);
	}
}


export default DishDetail;



				