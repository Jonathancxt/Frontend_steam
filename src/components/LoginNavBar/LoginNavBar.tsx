import { FC } from 'react';
import { Link } from 'react-router-dom';
import {useReduxAccountSliceService} from "../../redux/slices/account/accountSlice.service.ts";
import UserNavMenu from "../UserNavMenu/UserNavMenu.tsx";


const loginNavBarItems = [
    {
        name: 'Login',
        path: '/login'
    },
    {
        name: 'Sign up',
        path: '/signup'
    }
];

interface LoginNavBarProps {
    // Insert props types here if passing down props from parent component
}
const LoginNavBar: FC<LoginNavBarProps> = () => {
    const {getReduxAuthSliceIsUserAuthenticated } = useReduxAccountSliceService()
    const isUserAuthenticated = getReduxAuthSliceIsUserAuthenticated();
    return (
        <>
            <nav className="flex justify-center my-auto">
                    <span className="flex justify-between gap-4">
                        {isUserAuthenticated ? (
                    <>
                        <UserNavMenu />
                    </>
                ) : (
                    <span className="flex justify-between gap-4">
                        {loginNavBarItems.map((item, index) => {
                            return (
                                <Link
                                    to={item.path}
                                    className="relative text-base w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                                    key={index}
                                >
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </span>
                )}
                    </span>
            </nav>

        </>
    );
};

export default LoginNavBar;
