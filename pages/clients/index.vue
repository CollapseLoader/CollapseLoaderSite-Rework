<script setup lang="ts">
import { BarChart, Download, Rocket, Search, ArrowLeft } from 'lucide-vue-next'

const { t } = useI18n()

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
            <header class="text-center mb-16">
                <NuxtLink to="/"
                    class="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span class="text-sm font-medium">{{ t('back') }}</span>
                </NuxtLink>

                <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                    {{ t('clients.title') }}
                </h1>

                <div class="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mt-10">
                    <div class="relative flex-grow group">
                        <input v-model="searchQuery" type="text" :placeholder="t('search_clients')"
                            class="input w-full pl-12 h-14 bg-transparent border border-white/5 focus:border-primary/50 outline-none transition-all" />
                        <Search
                            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/60 group-focus-within:text-primary transition-colors pointer-events-none" />
                    </div>
                </div>
            </header>

            <div v-if="filteredClients.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <NuxtLink v-for="(client, idx) in filteredClients" :key="client.id" :to="`/clients/${client.id}`"
                    class="group relative" :style="{
                        animation: `fadeIn 0.5s ease-out forwards ${idx * 0.05}s`,
                        textDecoration: 'none'
                    }">
                    <div
                        class="glass-card rounded-[2.5rem] p-3 relative overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
                        <div
                            class="absolute inset-0 rounded-[2.5rem] pointer-events-none bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity">
                        </div>
                        <div
                            class="bg-gradient-to-br from-base-300/20 to-base-200/10 rounded-[2rem] p-8 backdrop-contrast-125">
                            <div class="flex justify-between items-start mb-10">
                                <div
                                    class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Rocket class="w-8 h-8" />
                                </div>
                                <div class="badge glass-card border-white/10 py-3">{{ client.version }}</div>
                            </div>

                            <h2 class="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">{{
                                client.name }}</h2>

                            <div class="flex flex-wrap gap-2 mt-4">
                                <span
                                    class="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-primary/20 text-primary">
                                    {{ client.client_type }}
                                </span>
                                <span
                                    class="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-white/5 text-white/40">
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