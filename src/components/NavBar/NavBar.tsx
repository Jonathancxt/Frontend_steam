import {Link, Outlet } from 'react-router-dom';
import LoginNavBar from "../LoginNavBar/LoginNavBar.tsx";

const navBarItems = [
    {name: 'Home', path: '/'},
    {name: 'Games Catalogue', path: '/games-catalogue'},
];
const NavBar = () => {
    return (
        <>
            <div className="relative self-start">
                <nav className="w-full p-2 mx-auto flex justify-center gap-20 text-xl font-medium color text-slate-600 top-0 sticky bg-white bg-opacity-100 z-50">

                    {navBarItems.map((item, index) => {
                        return (
                            <Link
                                to={item.path}
                                className="relative text-base w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                                key={index}
                            >
                                <span className="flex justify-center gap-1">{item.name}</span>
                            </Link>
                        );
                    })}
                    <LoginNavBar></LoginNavBar>
                </nav>

                {/*Do not remove this*/}
                <Outlet></Outlet>
            </div>
        </>
    );
};

export default NavBar;
