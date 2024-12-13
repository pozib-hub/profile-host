import { render, screen } from '@testing-library/react'
import { Text } from './Text'

describe('Text', () => {
    test('Text h1', () => {
        render(<Text>Test</Text>)
        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    // test('Button variant text', () => {
    //     render(<Button variant="text">Test</Button>)
    //     expect(screen.getByText('Test')).toHaveClass('transparent')
    // })
})
