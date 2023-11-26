import {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useFormValidator} from '../../hooks/useFormValidator.ts';
import {useToast} from '../../hooks/useToast.tsx';
import {useHttpAccount} from "../../api/account/account.api.ts";
import {Button, Fieldset, Group, TextInput, PasswordInput } from '@mantine/core';

interface SignUpTOProps {
    name: string;
    email: string;
    password: string;
}

interface SignUpPageProps {

}
const SignUpPage: FC<SignUpPageProps> = () => {
    const navigate = useNavigate();
    const {validatePassword, validateEmail} = useFormValidator();
    const {httpAccountSignup} = useHttpAccount()
    const {updateToastLoadingToSuccess, updateToastLoadingToFailure, toastLoading} = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        getValues
    } = useForm({mode: 'onTouched'});


    const onSubmit = async (data: any) => {
        try {
            const newUser: SignUpTOProps = {
                name: data.name,
                email: data.email,
                password: data.password
                };
            setIsLoading(true);
            toastLoading('signUpLoading');
            await httpAccountSignup(newUser);
            updateToastLoadingToSuccess('signUpLoading', 'User created', 'You can now login to verify your account!');
            navigate('/login');
            setIsLoading(false);
        } catch (err) {
            updateToastLoadingToFailure('signUpLoading', 'Error creating user', 'Please try again!');
            console.log(err);
        } finally {
             setIsLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen">
                <form className=" flex h-96 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <Fieldset className="m-auto w-1/3 min-h-fit" legend="Register an account">
                        <TextInput label="Name" placeholder="name" {...register('name', {required: true})}></TextInput>
                        <p>{errors.name && <span className="text-red-500">This field is required</span>}</p>

                        <TextInput
                            type="email"
                            label="Email"
                            placeholder="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    isValidEmail: (value) => validateEmail(value) || 'invalid email'
                                }
                            })}
                        ></TextInput>
                        <p>{errors.emailAddress && <span className="text-red-500">Email is invalid.</span>}</p>

                        <PasswordInput
                            label="Password"
                            placeholder="password"
                            {...register('password', {
                                required: true,
                                validate: {
                                    isValidPassword: (value) => validatePassword(value) || 'invalid Password'
                                }
                            })}
                        ></PasswordInput>
                        <p>{errors.password && <span className="text-red-500">This field is required</span>}</p>

                        <PasswordInput
                            label="Confirm Password"
                            placeholder="password"
                            {...register('confirmPassword', {
                                required: true,
                                validate: {
                                    isValidPassword: (value) => value === getValues('password') || 'invalid confirm password'
                                }
                            })}
                        ></PasswordInput>
                        <p>{errors.confirmPassword && <span className="text-red-500">Password are not the same.</span>}</p>

                        <Group justify="flex-end" mt="md">
                            <Button disabled={!isValid || isLoading} name="submit" type="submit">
                                Submit
                            </Button>
                        </Group>
                    </Fieldset>
                </form>
            </div>
        </>
    );
};

export default SignUpPage;
