import PostFeed from "../PostFeed/PostFeed";

const HomePage = () => {
    return (
        <>
            <div className="w-full text-center">
                <div className="font-semibold text-slate-600">Updates on Steam</div>
                <PostFeed/>
            </div>
        </>
    );
};

export default HomePage;
