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
    const loading = useState<boolean>('clients_loading', () => false)

    const fetchClients = async () => {
        if (all.value?.length || loading.value) {
            return
        }

        loading.value = true
        try {
            const [allData, fabricData, forgeData] = await Promise.all([
                $fetch<{ success: boolean, data: any }>('https://atlas.collapseloader.org/api/v1/clients'),
                $fetch<{ success: boolean, data: any }>('https://atlas.collapseloader.org/api/v1/fabric-clients'),
                $fetch<{ success: boolean, data: any }>('https://atlas.collapseloader.org/api/v1/forge-clients')
            ])

            all.value = Array.isArray(allData?.data) ? allData.data : [];
            fabric.value = Array.isArray(fabricData?.data) ? fabricData.data : [];
            forge.value = Array.isArray(forgeData?.data) ? forgeData.data : [];

            const getType = (c: any) => (c?.client_type ?? '').toString().toLowerCase();
            vanilla.value = all.value.filter((c: any) => getType(c) === 'default');
        } catch (err) {
            console.error('Failed to fetch clients:', err)
        } finally {
            loading.value = false
        }
    }

    if (import.meta.client && !all.value?.length) {
        void fetchClients();
    }

    return { vanilla, fabric, forge, all, loading, fetchClients };
}
