import { render } from '@testing-library/react';

import { ButtonContent, TID_BUTTON_LOADER } from './button-content';

describe('ButtonContent', () => {
  it('renders the component', () => {
    // Arrange & Act
    const { container } = render(
      <ButtonContent>Just a button content</ButtonContent>,
    );

    // Assert
    expect(container).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent('Just a button content');
  });

  it.each([
    {
      case: 'shows a loader when the isLoading prop is true',
      isLoading: true,
    },
    {
      case: 'hides a loader when the isLoading prop is false',
      isLoading: false,
    },
  ])('$case', ({ isLoading }) => {
    // Arrange & Act
    const { queryByTestId } = render(
      <ButtonContent isLoading={isLoading}>
        Just a button content
      </ButtonContent>,
    );

    // Assert
    if (isLoading) {
      expect(queryByTestId(TID_BUTTON_LOADER)).toBeInTheDocument();
    }

    if (!isLoading) {
      expect(queryByTestId(TID_BUTTON_LOADER)).not.toBeInTheDocument();
    }
  });
});
