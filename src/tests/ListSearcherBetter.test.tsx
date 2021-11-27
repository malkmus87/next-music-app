/* eslint-disable no-undef */
/* eslint-disable max-len */
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, fireEvent } from '@testing-library/react';
import ListSearcherTestWrapper from './_test-wrappers/ListSearcherTestWrapper';

it('Renders Correctly', () => {
  const { getByTestId } = render(
    <ListSearcherTestWrapper values={[{ name: 'Henrik' }, { name: 'Sebbe' }]} />,
  );
  expect(getByTestId('ListSearcherTextField').textContent).toContain('Sök');
});
describe('Key input', () => {
  it('List searcher updates correctly', () => {
    const { getByTestId } = render(
      <ListSearcherTestWrapper values={[{ name: 'Henrik', id: '0' }, { name: 'Sebbe', id: '1' }]} />,
    );
    expect(getByTestId('value0').textContent).toBe('Henrik');

    fireEvent.change(getByTestId('ListSearcherTextFieldInput'), { target: { value: 'S' } });

    setTimeout(() => { // Need to find a way around this
      expect(getByTestId('value0').textContent).toBe('Henrik');
      expect(getByTestId('ListSearcherTextFieldInput').textContent).toBe('x');
    }, 200);
  });
});
