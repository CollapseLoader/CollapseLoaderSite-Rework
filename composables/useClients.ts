type Client = {
    id: string | number
    name: string
    version: string
    client_type: string
    launches: number,
    downloads?: number,
    working?: boolean,
}

export default function useClients() {
    const vanilla = useState<Client[]>('clients_vanilla', () => [])
    const fabric = useState<Client[]>('clients_fabric', () => [])
    const forge = useState<Client[]>('clients_forge', () => [])
    const all = useState<Client[]>('clients_all', () => [])

    const fetchClients = async () => {
        if ((vanilla.value && vanilla.value.length) || (fabric.value && fabric.value.length) || (forge.value && forge.value.length)) {
            return
        }

        const { data: allData } = await useFetch<{ success: boolean, data: any }>('https://atlas.collapseloader.org/api/v1/clients');
        all.value = Array.isArray(allData.value?.data) ? allData.value.data : [];

        const { data: fabricData } = await useFetch<{ success: boolean, data: any }>('https://atlas.collapseloader.org/api/v1/fabric-clients');
        fabric.value = Array.isArray(fabricData.value?.data) ? fabricData.value.data : [];

        const { data: forgeData } = await useFetch<{ success: boolean, data: any }>('https://atlas.collapseloader.org/api/v1/forge-clients');
        forge.value = Array.isArray(forgeData.value?.data) ? forgeData.value.data : [];

        const getType = (c: any) => (c?.client_type ?? '').toString().toLowerCase();
        vanilla.value = all.value.filter((c: any) => getType(c) === 'default');
    }

    void fetchClients();

    return { vanilla, fabric, forge, all, fetchClients };
}
