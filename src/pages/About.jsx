import Header from "../components/Header";
import Styles from "../styles/pages/About.module.css";

export default function About() {
    return <div className={Styles.aboutPageContainer}>
        <Header
            title="About Filtero"
            subtitle="Learn more about our image filtering application"
            buttonText="Pages"
            menuItems={[
                { title: "Home", link: "/" },
                { title: "About", link: "/about" },
                { title: "Login", link: "/login" }
            ]}
        />
        <div className="spacer"></div> 
    
        <div className={Styles.content}>
            <h1>About Filtero</h1>
            <p>
                Filtero is an innovative web application designed to help users easily apply various filters to their images. Whether you want to enhance your photos with a blur effect, convert them to grayscale, or add a sepia tone, Filtero has got you covered.
            </p>
            <p>
                Our mission is to provide a simple and intuitive platform for image editing, allowing users of all skill levels to create stunning visuals with just a few clicks. We believe that everyone should have access to powerful image editing tools without the need for complex software.
            </p>
            <p>
                Thank you for choosing Filtero for your image filtering needs! We are constantly working to improve our application and add new features, so stay tuned for updates.
            </p>
        </div>
    </div>;
}