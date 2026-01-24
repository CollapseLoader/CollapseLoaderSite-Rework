<script setup lang="ts">
import { Search, ArrowLeft } from 'lucide-vue-next'

const { t } = useI18n()
const localePath = useLocalePath();

const { data: vanillaClients } = await useFetch<any[]>('https://api.collapseloader.org/clients/')
const { data: fabricClients } = await useFetch<any[]>('https://api.collapseloader.org/fabric-clients/')
const { data: forgeClients } = await useFetch<any[]>('https://api.collapseloader.org/forge-clients/')

const allClients = computed(() => {
    return [
        ...(vanillaClients.value || []),
        ...(fabricClients.value || []),
        ...(forgeClients.value || [])
    ]
})

const searchQuery = ref('')

const filteredClients = computed(() => {
    if (!searchQuery.value) return allClients.value
    return allClients.value.filter(c =>
        c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

useSeoMeta({
    title: () => t('clients.seo_title'),
    description: () => t('clients.seo_desc'),
})
</script>

<template>
    <div class="bg-base-200 min-h-screen pt-32 pb-20 px-6">
        <div
            class="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--p)/0.05),transparent_50%)]">
        </div>

        <div class="max-w-7xl mx-auto relative z-10">
            <header class="text-center mb-20 relative">
                <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-50">
                </div>

                <NuxtLink :to="localePath('/')"
                    class="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10 group bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                    <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span class="text-sm font-medium">{{ t('back') }}</span>
                </NuxtLink>

                <h1 class="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl">
                    {{ t('clients.title') }}
                </h1>

                <div class="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mt-12">
                    <div class="relative flex-grow group z-20">
                        <input v-model="searchQuery" type="text" :placeholder="t('search_clients')"
                            class="input w-full pl-14 h-16 bg-white/5 border border-white/10 hover:border-white/20 focus:border-primary/50 focus:bg-white/10 outline-none transition-all rounded-2xl text-lg backdrop-blur-xl shadow-2xl" />
                        <Search
                            class="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40 group-focus-within:text-primary transition-colors pointer-events-none" />
                    </div>
                </div>
            </header>

            <div v-if="filteredClients.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <NuxtLink v-for="(client, idx) in filteredClients" :key="client.id"
                    :to="localePath(`/clients/${client.id}`)" class="group relative block" :style="{
                        animation: `fadeIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards ${idx * 0.05}s`,
                        textDecoration: 'none'
                    }">
                    <div
                        class="glass-card rounded-[2rem] p-2 relative overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1 border border-white/5 group-hover:border-primary/30 group-hover:shadow-[0_0_30px_-5px_hsl(var(--p)/0.3)]">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        </div>

                        <div
                            class="bg-base-300/40 rounded-[1.75rem] p-8 h-full flex flex-col backdrop-blur-md relative z-10 transition-colors group-hover:bg-base-300/60">

                            <div class="flex justify-between items-start mb-8">
                                <div
                                    class="badge badge-lg bg-white/5 border-white/10 text-white/70 backdrop-blur-md font-mono">
                                    {{ client.version }}</div>
                            </div>

                            <h2
                                class="text-3xl font-bold mb-2 text-white group-hover:text-primary transition-colors tracking-tight">
                                {{ client.name }}</h2>

                            <div class="flex flex-wrap gap-2 mt-auto">
                                <span
                                    class="text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                    {{ client.client_type }}
                                </span>
                                <span
                                    class="text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full bg-white/5 text-white/40 border border-white/5">
                                    {{ client.launches }} {{ t('launches') }}
                                </span>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
            <div v-else class="text-center py-20 opacity-50">
                {{ t('no_clients_found') }}
            </div>
        </div>
    </div>
</template>