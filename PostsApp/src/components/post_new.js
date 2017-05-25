import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

//1° first create component to display form
class PostNew extends Component {

	submit(data) {
		console.log('reaches here', data);
		this.props.createPost(data);
	}

 	static contextTypes = {
 		router: PropTypes.object
 	};

 	onSubmit(props) {
 		this.props.createPost(props)
 		.then(() => {
 			this.context.router.push('/');
 		});
 	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create a new Post</h3>

				<Field name="title" label="Title" component={renderField} type="text"/>
				<Field name="categories" label="Categories" className="form-control" component={renderField} type="text"/>
				<Field name="content" label="Content" className="form-control" component={renderTextArea} type="textarea"/>


				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`form-group ${(touched && error)? 'has-danger' : '' }`}>
    <label>{label}</label>
    <div>		  	
      <input className="form-control" {...input} type={type}/>
      {touched && ((error && <span className="text-help">{error}</span>))}
    </div>
  </div>
);

const renderTextArea = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`form-group ${(touched && error)? 'has-danger' : '' }`}>
    <label>{label}</label>
    <div>
      <textarea className="form-control" {...input} type={type}/>
      {touched && ((error && <span className="text-help">{error}</span>))}
    </div>
  </div>
);

const validate = values => {
	// body...
	const errors = {};
	if (!values.title) {
		errors.title = 'Enter a User name';
	}
	if (!values.categories) {
		errors.categories = 'Enter categories';
	}
	if (!values.content) {
		errors.content = 'Enter content';
	}
	return errors;
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ createPost }, dispatch);
}

export default connect(null, mapDispatchToProps)(reduxForm({
	form: 'PostNew',
	validate
})(PostNew));
