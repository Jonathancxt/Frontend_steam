import React, {Fragment, useEffect, useState} from 'react';
import {useHttpGames} from '../../api/games/games.api.ts';
import {useNavigate} from 'react-router-dom';
import {Badge, Button, Image, Text, Card, Group} from '@mantine/core';

const GamesCataloguePage = () => {
    const [steamGames, setSteamGames] = useState([]);
    const navigate = useNavigate();
    const {httpGamesGetAllGames} = useHttpGames();
    useEffect(() => {
        const fetchGames = async () => {
            const games = await httpGamesGetAllGames();
            setSteamGames(games);
        };
        fetchGames();
    }, []);

    const goToGameDetailPage = (game) => {
        navigate(`/games-catalogue/${game.title}`, {state: {game: game}});
    };

    return (
        <>
            <div className="w-full">
                <div className="w-96 mx-auto font-medium text-center text-xl m-6">Games catalogue</div>
            </div>
            <div className="grid grid-cols-4 gap-2 w-1/2 mx-auto">
                <>
                    {steamGames.map((game, index) => {
                        return (
                            <Fragment key={index}>
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                    onClick={() => {
                                        goToGameDetailPage(game);
                                    }}
                                    className="onHover:bg-gray-200 cursor-pointer shadow-sm"
                                >
                                    <Card.Section>
                                        <Image src={game.image_url} height={160} />
                                    </Card.Section>

                                    <Group justify="space-between" mt="md" mb="xs">
                                        <Text fw={500}>{game.title}</Text>
                                        <Badge color="Red" variant="light">
                                            Hot!
                                        </Badge>
                                    </Group>

                                    <Text size="sm" c="dimmed" lineClamp={3}>
                                        {game.description}
                                    </Text>
                                </Card>
                            </Fragment>
                        );
                    })}
                </>
            </div>
        </>
    );
};

export default GamesCataloguePage;
