import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
    test('Button text', () => {
        render(<Button>Test</Button>)
        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    test('Button variant clear', () => {
        render(<Button variant="clear">Test</Button>)
        const button = screen.getByTestId('button')
        expect(button).toHaveClass('clear')
    })
})
