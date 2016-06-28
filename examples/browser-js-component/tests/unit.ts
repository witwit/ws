import expect from 'expect';
import { add } from '../src/index';

describe('test my code', () => {
  it('should add two numbers', () => {
    expect(add(1, 1)).toBe(2);
  });
});
