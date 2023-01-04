import Joi from 'joi';
import BootstrapForm from 'react-bootstrap/Form';
import Form from '../../../components/common/Form';
import Errors from '../../../models/common/errors';

interface Test {
  name: string;
  age: number | '';
}

export default class TestForm extends Form<Test> {
  state: { data: Test; errors: Errors } = {
    data: {
      name: '',
      age: '',
    },
    errors: {},
  };

  schema = Joi.object<Test>({
    name: Joi.string().required().min(3).label('Name'),
    age: Joi.number().min(0).max(100).required().label('Age'),
  });

  doSubmit() {
    console.log('Submitted');
  }

  render() {
    return (
      <BootstrapForm onSubmit={this.handleSubmit}>
        {this.renderInput('name', 'Name')}
        {this.renderInput('age', 'Age', 'number')}
        {this.renderButton('Submit')}
      </BootstrapForm>
    );
  }
}
