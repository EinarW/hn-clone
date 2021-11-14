import React from "react";

export default class Loading extends React.Component {
    state = {
        content: this.props.content
    }

    componentDidMount () {
        const { speed, content } = this.props
    
        this.interval = window.setInterval(() => {
            this.state.content === content + '...'
                ? this.setState({ content: content })
                : this.setState(({ content }) => ({ content: content + '.' }))
        }, speed)
    }
    
    componentWillUnmount () {
        window.clearInterval(this.interval)
    }

    render() {
        return(
            this.state.content
        )
    }
}

Loading.defaultProps = {
    content: 'Loading',
    speed: 300
}