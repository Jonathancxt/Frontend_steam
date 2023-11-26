import {useNavigate} from 'react-router-dom';
import {useToast} from '../../hooks/useToast.tsx';
import {useState} from 'react';
import {Button, Fieldset, Group, PasswordInput, TextInput} from '@mantine/core';
import {useForm} from 'react-hook-form';
import {useReduxAccountSliceService} from "../../redux/slices/account/accountSlice.service.ts";
import {useHttpAccount} from "../../api/account/account.api.ts";


interface LoginTOProps {
    email: string;
    password: string;
}
const LoginPage = () => {
    const navigate = useNavigate();
    const {httpAccountLogin} = useHttpAccount();
    const {setReduxAccountSlice, getReduxAccountSlice, getReduxAccountSliceEmail, getReduxAccountSliceId, getReduxAccountSliceName} = useReduxAccountSliceService();
    const { toastLoading, updateToastLoadingToSuccess, updateToastLoadingToFailure} = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({mode: 'onTouched'});

    const onSubmit = async (data: any): Promise<void> => {
        try {
            setIsLoading(true);
            toastLoading('loadLogin');
            const loginTO: LoginTOProps = {email:data.email, password:data.password}

            const {id, name, email, purchasedGames} = await httpAccountLogin(loginTO);
            setReduxAccountSlice(id, name, email, purchasedGames)
            updateToastLoadingToSuccess('loadLogin', 'Login successful', 'You are now logged in!');
            navigate('/');
            setIsLoading(false);
        } catch (err) {
            updateToastLoadingToFailure('loadLogin', 'Login failed', 'Please try again');
            console.log(err);
            setIsLoading(false);
        }
    };
    return (
        <>
            <form className=" flex h-96 w-full" onSubmit={handleSubmit(onSubmit)}>
                <Fieldset className="m-auto w-1/3 min-h-fit" legend="Sign into your account.">
                    <TextInput label="Email" placeholder="email" {...register('email', {required: true})}></TextInput>
                    {errors.email && <span className="text-red-500">This field is required</span>}

                    <PasswordInput label="Password" placeholder="password" {...register('password', {required: true})}></PasswordInput>
                    {errors.password && <span className="text-red-500">This field is required</span>}
                    <Group justify="flex-end" mt="md">
                        <Button disabled={!isValid || isLoading} name="submit" type="submit">
                            Submit
                        </Button>
                    </Group>
                </Fieldset>
            </form>
        </>
    );
};

export default LoginPage;
