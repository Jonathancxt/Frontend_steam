import React, {useEffect, useState} from 'react';
import {useHttpAccount} from '../../api/account/account.api.ts';
import {useReduxAccountSliceService} from '../../redux/slices/account/accountSlice.service.ts';
import {Button, Fieldset, Group, PasswordInput, TextInput} from '@mantine/core';
import {Badge, Card, Image, Text} from "@mantine/core";
import {TbUser} from "react-icons/tb";

const SteamProfile = () => {
    const [steamProfile, setSteamProfile] = useState({email: '', name: '', id: '', purchasedGames: [], userPreferences: [], writtenReviews: []});
    const {httpAccountGetUserByEmail} = useHttpAccount();
    const {getReduxAccountSliceEmail} = useReduxAccountSliceService();

    useEffect(() => {
        const fetchSteamProfile = async () => {
            const accountTO = {email: getReduxAccountSliceEmail()};
            const steamProfile = await httpAccountGetUserByEmail(accountTO);
            console.log('steamProfile', steamProfile);
            setSteamProfile(steamProfile);
        };
        fetchSteamProfile();
    }, []);

    return (
        <div>
            <div className="w-full">
                <div className="w-3/4 border-black border mx-auto text-center">
                    <section>
                        <Fieldset className="m-auto w-1/3 min-h-fit" legend="Information about steam profile">
                            <section className="flex justify-left gap-2 w-1/2 mx-auto">
                                <label className="font-bold flex">Name: </label>
                                <div className="flex">{steamProfile.name}</div>
                            </section>

                            <section className="flex justify-left gap-2 w-1/2 mx-auto">
                                <label className="font-bold">Email: </label>
                                <div className="flex">{steamProfile.email}</div>
                            </section>
                        </Fieldset>
                    </section>

                    <section>
                        <Fieldset className="m-auto w-full min-h-fit flex justify-center gap-5" legend="Purchased games">
                            {steamProfile.purchasedGames.map((game, index) => {
                                return (
                                    <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                    className="onHover:bg-gray-200 shadow-sm flex w-1/5"
                                >
                                    <Card.Section>
                                        <Image src={game.image_url} height={160} />
                                    </Card.Section>

                                    <Group justify="space-between" mt="md" mb="xs">
                                        <Text fw={500}>{game.title}</Text>

                                    </Group>
                                </Card>
                                );
                            })}
                        </Fieldset>
                    </section>

                    <section>
                        <Fieldset className="m-auto w-3/4 min-h-fit" legend="Written reviews">
                            {steamProfile.writtenReviews.map((review, index) => {
                                return (
                                    <div key={index}>
                                         <div className="border border-black shadow-border my-1 rounded-2xl flex h-30 relative">
                                    <div className="flex justify-center gap-2">
                                        <TbUser size={50} />
                                        <div className="font-bold text-xl flex my-auto">{review.author}</div>
                                        <div className="font-bold text-xl flex my-auto">{review.gameTitle}</div>
                                        <div className="flex my-auto italic">"{review.content}"</div>
                                    </div>
                                </div>
                                    </div>
                                );
                            })}
                        </Fieldset>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SteamProfile;
