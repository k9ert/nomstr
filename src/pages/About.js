import { TopNavBar, Alert, Card } from "../Lib.js"

const About = () => {

    return (
        <div className="App bg-blue-700">
            <p className="text-cyan-600">Hello</p>
            <TopNavBar/>
            <Alert text="alert Text!!"/>
            
            <div className='grid grid-cols-1 m-11 text-black'>
                <Card>
                <p>This is a testproject playing with React, GraphQL and strawberry!</p>
                </Card>
            </div>
        </div>
    );
}

export {About};