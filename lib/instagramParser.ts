export interface InstagramUser {
    id: number;
    name: string;
    username: string;
    profilePic: string;
}

interface FollowingItem {
    title?: string;
    string_list_data: Array<{
        href: string;
        timestamp: number;
    }>;
}

interface FollowerItem {
    title?: string;
    media_list_data?: any[];
    string_list_data: Array<{
        href: string;
        value: string;
        timestamp: number;
    }>;
}

interface FollowingData {
    relationships_following: FollowingItem[];
}

export async function parseInstagramData(files: FileList): Promise<InstagramUser[]> {
    try {
        // Validate that we have exactly 2 files
        if (files.length !== 2) {
            throw new Error('Por favor, selecione exatamente 2 arquivos: following.json e followers_1.json');
        }

        let followersData: FollowerItem[] | null = null;
        let followingData: FollowingItem[] | null = null;

        // Process each file
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Validate file type
            if (!file.name.endsWith('.json')) {
                throw new Error(`Arquivo "${file.name}" não é um JSON. Por favor, faça upload apenas de arquivos JSON.`);
            }

            // Read and parse JSON
            const text = await file.text();
            let data: any;

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(`Arquivo "${file.name}" não é um JSON válido. Verifique se o arquivo não está corrompido.`);
            }

            // Check if it's a following file
            if (data.relationships_following && Array.isArray(data.relationships_following)) {
                // Validate structure
                if (data.relationships_following.length > 0) {
                    const firstItem = data.relationships_following[0];
                    if (!firstItem.string_list_data || !Array.isArray(firstItem.string_list_data)) {
                        throw new Error(`Arquivo "${file.name}" não está no formato esperado do following.json.`);
                    }
                }

                if (followingData) {
                    throw new Error('Você enviou dois arquivos following.json. Por favor, envie um following.json e um followers_1.json.');
                }

                followingData = data.relationships_following;
            }
            // Check if it's a followers file (array format)
            else if (Array.isArray(data)) {
                // Validate structure
                if (data.length > 0) {
                    const firstItem = data[0];
                    if (!firstItem.string_list_data || !Array.isArray(firstItem.string_list_data)) {
                        throw new Error(`Arquivo "${file.name}" não está no formato esperado do followers_1.json.`);
                    }
                    if (!firstItem.string_list_data[0]?.value) {
                        throw new Error(`Arquivo "${file.name}" não está no formato esperado do followers_1.json.`);
                    }
                }

                if (followersData) {
                    throw new Error('Você enviou dois arquivos followers_1.json. Por favor, envie um following.json e um followers_1.json.');
                }

                followersData = data;
            }
            else {
                throw new Error(`Arquivo "${file.name}" não foi reconhecido como following.json ou followers_1.json. Verifique se exportou corretamente do Instagram.`);
            }
        }

        // Validate that we have both files
        if (!followersData) {
            throw new Error('Arquivo followers_1.json não foi encontrado. Por favor, selecione ambos os arquivos.');
        }
        if (!followingData) {
            throw new Error('Arquivo following.json não foi encontrado. Por favor, selecione ambos os arquivos.');
        }

        // Process the data
        return processData(followersData, followingData);
    } catch (error) {
        console.error('Error parsing Instagram data:', error);

        // If it's already our custom error, re-throw it
        if (error instanceof Error) {
            throw error;
        }

        // Otherwise, throw a generic error
        throw new Error('Erro ao processar arquivos. Verifique se são arquivos válidos exportados do Instagram.');
    }
}

function processData(followers: FollowerItem[], following: FollowingItem[]): InstagramUser[] {
    // Extract usernames from followers (from value field)
    const followerUsernames = new Set<string>();
    followers.forEach((item) => {
        item.string_list_data?.forEach((data) => {
            if (data.value) {
                followerUsernames.add(data.value);
            }
        });
    });

    // Extract usernames from following (from title field)
    const followingUsernames = new Set<string>();
    following.forEach((item) => {
        if (item.title) {
            followingUsernames.add(item.title);
        }
    });

    // Validate that we extracted some data
    if (followingUsernames.size === 0) {
        throw new Error('Não foi possível extrair a lista de quem você segue. Verifique se o arquivo following.json está correto.');
    }

    // Find users you follow but who don't follow you back
    const nonFollowers: InstagramUser[] = [];
    let id = 1;

    followingUsernames.forEach((username) => {
        if (!followerUsernames.has(username)) {
            nonFollowers.push({
                id: id++,
                name: username,
                username: username,
                profilePic: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
            });
        }
    });

    return nonFollowers;
}
