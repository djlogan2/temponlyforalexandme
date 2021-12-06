import * as React from "react";
import {logout} from "../../../data/redux/reducers/authReducer";
import {useAppDispatch} from "../../../data/redux/hooks";

const Home = () => {
    const dispatch = useAppDispatch();
    return (
        <div
            style={{
                width: "100%",
                height: "98.41vh",
                padding: "0",
                margin: "0",
            }}
        >
            <button onClick={() => dispatch(logout())}>logout</button>
            <img
                src="https://v2a.chessclub.com/images/home-page/home-top.jpg"
                alt="chess club"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
        </div>
    );
}

export default Home;
