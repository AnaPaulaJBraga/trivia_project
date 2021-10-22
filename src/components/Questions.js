import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questionApiThunk } from '../actions';

class Questions extends React.Component {
  componentDidMount() {
    const { token, getQuestion } = this.props;
    getQuestion(token);
  }

  render() {
    const { questions } = this.props;
    const CODE = 3;
    if (questions.results === undefined) return <p>Loading...</p>;
    if (questions.response_code === CODE) {
      return <p>Section expired</p>;
    }
    const { results } = questions;
    return (
      <main>
        <h2 data-testid="question-category">
          { results[0].category }
        </h2>
        <p data-testid="question-text">
          { results[0].question }
        </p>
        <div className="answers">
          <button
            type="button"
            data-testid="correct-answer"
            className="btn-answer"
          >
            { results[0].correct_answer }
          </button>
          { results[0].incorrect_answers.map((answer, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              className="btn-answer"
            >
              { answer }
            </button>
          ))}
        </div>
      </main>
    );
  }
}

Questions.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    response_code: PropTypes.number.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token.success,
  questions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestion: (token) => dispatch(questionApiThunk(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);