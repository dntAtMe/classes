
type UserPost = {
    content: String
};

type User = {
    userId: number,
    name: String,
    age: number,
    avatar: String,
    posts: UserPost[]
};

async function sleep(ms: number) {
    return new Promise((resolve) => { setTimeout(resolve, ms) });
}

async function getMyUserId(): Promise<number> {
    return 1;
}

async function getUserName(userId: number): Promise<String> {
    return "Test User";
}

async function getUserAvatar(userId: number): Promise<String> {
    return "https://imgur.com/...";
}

async function getUserAge(userId: number): Promise<number> {
    return 50;
}

async function getUserPosts(userId: number): Promise<UserPost[]> {
    await sleep(3000);
    return [
        { content: "Post 1" },
        { content: "Post 2" },
    ];
}

async function getUser(userId: number): Promise<User> {
    return {
        userId,
        name: "Test User",
        age: 50,
        avatar: "https://imgur.com/...",
        posts: [{ content: "Test" }]
    };
}

function renderUser(user: User) {
    console.log(user);
}


export async function ParseUserInfo1() {
    const userId = await getMyUserId()

    const name = await getUserName(userId)
    const age = await getUserAge(userId);
    const avatar = await getUserAvatar(userId);
    const posts = await getUserPosts(userId);
        
    const user: User = {
        userId,
        name,
        age,
        avatar,
        posts
    };

    renderUser(user);
}

export async function ParseUserInfo2() {
    const userId = await getMyUserId();

    const user = await getUser(userId);

    renderUser(user);
}
