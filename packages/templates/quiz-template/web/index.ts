import { QuizSchema, QuizSchemaProps } from '../src';
import Quiz from './quiz-lazy';

window.Quiz = Quiz;
window.QuizSchema = QuizSchema as QuizSchemaProps;
