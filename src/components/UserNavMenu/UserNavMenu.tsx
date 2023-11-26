import {Avatar, Menu} from '@mantine/core';
import {FC, useState} from 'react';
import {TbLogout} from 'react-icons/tb';
import {useNavigate} from 'react-router-dom';
import {useToast} from '../../hooks/useToast.tsx';
import {TbSettings} from 'react-icons/tb';
import {TbBrandTinder} from 'react-icons/tb';
import {useReduxAccountSliceService} from "../../redux/slices/account/accountSlice.service.ts";

interface UserNavMenuProps {}
const UserNavMenu: FC<UserNavMenuProps> = () => {
    const {getReduxAccountSliceName,setReduxAccountSlice, setReduxAccountSliceIsAuthenticatedStatus } = useReduxAccountSliceService()
    const name = getReduxAccountSliceName();
    const navigate = useNavigate();
    const {toastLoading, updateToastLoadingToSuccess, updateToastLoadingToFailure} = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogOut = async () => {
        try {
            setIsLoading(true);
            toastLoading('toastLogout');
            setReduxAccountSlice(-1, '', '', []);
            setReduxAccountSliceIsAuthenticatedStatus(false);
            updateToastLoadingToSuccess('toastLogout', 'Logout successful', 'You are now logged out!');
            navigate('/');
        } catch (err) {
            updateToastLoadingToFailure('toastLogout', 'Logout unsuccessful', 'Please try again!');
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoSteamProfile = () => {
        navigate('/steamprofile/' + name);
    };

    return (
        <Menu>
            <Menu.Target>
                <button>
                    <div>
                        <Avatar size={30} radius={20}>
                            <TbBrandTinder size={20} />
                        </Avatar>
                    </div>
                </button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>{name}'s Settings</Menu.Label>
                <Menu.Item leftSection={<TbSettings />} onClick={() => handleGoSteamProfile()}>
                    Steam Profile
                </Menu.Item>
                <Menu.Item leftSection={<TbLogout />} onClick={() => handleLogOut()}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
            <Menu.Divider />
        </Menu>
    );
};

export default UserNavMenu;
