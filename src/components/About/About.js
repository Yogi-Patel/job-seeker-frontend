import React, {Component} from "react";

class About extends Component
{
    render()
    {
        return(
            <article id = 'container' className="mw7 center  br2 ">
                <article class="pa3 pa5-ns center">
                    <h1 class="f3 f1-m f-headline-l">About</h1>
                    <p class="measure lh-copy">
                        <h3>What is Job Seeker?</h3>
                        Job Seeker (this website) is something I built with React in the frontend and Express.js in the backend.
                        Instead of keeping track of your job applications in a spreadsheet like a dinosaur, one can use this.

                    </p>
                    <p class="measure lh-copy">
                    <h3>Why did I build this?</h3>
                        I graduated recently and I am looking for jobs. While applying for jobs, I found myself confused whenever I received updates (most of them are rejections, sadly) from somewhere.
                        I would always be like: "Huh? I don't remember applying at X for a job Y."
                        That is why I created this application/website so that I can keep a record of the jobs I have applied for. 
                        Also, making this helped me learn React and Express.
                    </p>
                    <p class="measure lh-copy">
                    <h3>How do I use this?</h3>
                        It is pretty simple. All you need to do is Sign up! If the Username you chose hasn't already been taken, then you can jump right in.
                        The application does not ask for email ids and you can sign up without entering any other detail (You do need a password and please don't forget it). 
                        I know that you could be hesitating and that is why I have provided you with the option to demo it first. 
                        To demo, just click on "I just want to demo" in the Sign In or Sign Up components! 
                    </p>
                    <h5> I hope you like it! :{')'} </h5>

                </article>

            </article>
        )
    }
}


export default About;