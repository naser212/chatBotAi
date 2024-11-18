import { useNavigate } from "react-router-dom";

export default function Front() {
    const navigate = useNavigate();

    const link = [
        { name: "elearn", url: "https://elearn.squ.edu.om/" },
        { name: "portal", url: "https://portal.squ.edu.om/" },
        { name: "SIS", url: "https://sis.squ.edu.om/" }
    ];

    return (
        <>
            <div className="flex flex-col md:text-center bg-purp md:mx-36 md:my-16 md:space-y-12 text-lato md:px-36 md:py-14 md:mt-44 text-white rounded-lg">
                <h1 className="text-4xl font-extrabold tracking-widest">AI advisor</h1>
                <p className="text-base font-semibold">Your personalized AI advisor for academic success. Get tailored course recommendations, career guidance, and instant support to enhance your educational journey. Start chatting now to receive expert advice whenever you need it.</p>
                <button
                    onClick={() => { navigate('/back'); }}
                    className="bg-button rounded-xl md:max-w-72 md:px-12 md:py-3 md:text-lg self-center font-bold"
                >
                    Chat Now
                </button>
            </div>
            <div className="flex flex-col space-y-2">
                <h1 className="text-center md:text-lg font-lato font-semibold">Online Services </h1>
                <div className="flex flex-row self-center space-x-4">
                    {link.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-4 bg-button rounded-lg text-white font-semibold"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
