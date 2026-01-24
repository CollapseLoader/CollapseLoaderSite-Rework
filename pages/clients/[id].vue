<script setup lang="ts">
import { Play, Download, ArrowLeft, ShieldCheck, Github } from 'lucide-vue-next'

const route = useRoute()
const clientId = route.params.id as string

const { data: client, error } = await useFetch<any>(`https://api.collapseloader.org/clients/${clientId}`)

const { t } = useI18n();
const localePath = useLocalePath();

if (!client.value && !error.value) {
    throw createError({ statusCode: 404, statusMessage: 'client not found' })
}

useSeoMeta({
    title: () => `${client.value?.name || t('clients.loading')} — ${t('clients.detail.seo_title_suffix')}`,
    ogTitle: () => `${client.value?.name} — ${t('clients.detail.og_title_suffix')}`,
    description: () => t('clients.detail.description_template', {
        name: client.value?.name,
        version: client.value?.version,
        type: client.value?.client_type,
    }),
})

const launchClient = () => {
    if (client.value) {
        window.location.href = `collapseloader://launch?client=${client.value.id}`
    }
}
</script>

<template>
    <div v-if="client" class="bg-base-200 min-h-screen selection:bg-primary/30">
        <div class="relative h-[60vh] w-full overflow-hidden">
            <div class="absolute inset-0 bg-base-300">
                <div class="absolute inset-0 bg-gradient-to-t from-base-200 via-base-200/50 to-transparent z-10"></div>
                <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50">
                </div>
                <div
                    class="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none">
                </div>
            </div>

            <div class="absolute inset-0 bg-grid-white/[0.02] mask-image-gradient-b"></div>

            <div class="container mx-auto px-6 h-full flex items-end pb-20 relative z-20">
                <div class="flex flex-col md:flex-row md:items-end gap-10 w-full">
                    <div class="flex-grow space-y-4 mb-2">
                        <NuxtLink :to="localePath('/clients')"
                            class="text-white/60 hover:text-white flex items-center gap-2 mb-4 w-fit px-4 py-2 rounded-full bg-black/20 backdrop-blur-md transition-colors border border-white/5 hover:border-white/10">
                            <ArrowLeft class="w-4 h-4" /> <span class="text-sm font-bold tracking-wide">{{
                                t('clients.back_to_library') }}</span>
                        </NuxtLink>
                        <h1 class="text-5xl md:text-8xl font-black text-white tracking-tighter drop-shadow-xl">{{
                            client.name }}</h1>
                        <div class="flex items-center gap-4 text-lg">
                            <span
                                class="badge badge-lg bg-primary text-primary-content border-none font-bold px-4 py-3">{{
                                    client.version }}</span>
                            <span class="text-white/40 font-mono hidden md:inline-block">ID: {{ client.id }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-6 py-16 -mt-10 relative z-30">
            <div class="grid lg:grid-cols-12 gap-16">
                <div class="lg:col-span-8 space-y-16">


                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div v-for="stat in [
                            { l: t('clients.detail.stats.downloads'), v: client.downloads, i: Download, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                            { l: t('clients.detail.stats.version'), v: client.version, i: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                            { l: t('clients.detail.stats.type'), v: client.client_type, i: Github, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                            { l: t('clients.detail.stats.status'), v: client.working ? t('clients.detail.status_ok') : t('clients.detail.status_error'), i: ShieldCheck, color: client.working ? 'text-green-400' : 'text-red-400', bg: client.working ? 'bg-green-400/10' : 'bg-red-400/10' },
                        ]" :key="stat.l"
                            class="glass-card p-6 rounded-3xl text-center border border-white/5 hover:border-white/10 transition-colors bg-base-100/30 backdrop-blur-md group">
                            <div
                                :class="`w-12 h-12 mx-auto mb-4 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`">
                                <component :is="stat.i" class="w-6 h-6" />
                            </div>
                            <div class="text-xs font-bold text-base-content/40 uppercase tracking-widest mb-1">{{ stat.l
                                }}
                            </div>
                            <div class="text-lg font-black tracking-tight">{{ stat.v }}</div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-4 relative">
                    <div
                        class="sticky top-10 glass-card rounded-[2.5rem] p-8 border border-white/10 overflow-hidden group shadow-2xl bg-base-100/40 backdrop-blur-xl">
                        <div
                            class="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-colors duration-700">
                        </div>

                        <h3 class="text-3xl font-black mb-8 text-center relative z-10">{{ t('clients.detail.launch') }}
                        </h3>

                        <button @click="launchClient"
                            class="btn btn-primary btn-lg w-full rounded-2xl h-20 text-xl font-bold group/btn overflow-hidden relative shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all border-none">
                            <div
                                class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">
                            </div>
                            <Play class="fill-current w-6 h-6 mr-2 relative z-10" /> <span class="relative z-10">{{
                                t('clients.detail.launch_now') }}</span>
                        </button>

                        <div class="mt-8 space-y-4 relative z-10">
                            <div
                                class="flex items-center justify-between text-sm glass-card p-5 rounded-2xl border border-white/5 bg-black/20">
                                <span class="text-base-content/60 font-medium">{{ t('clients.detail.loader_status')
                                    }}</span>
                                <span
                                    class="flex items-center gap-2 text-success font-bold bg-success/10 px-3 py-1 rounded-full">
                                    <span class="relative flex h-2 w-2">
                                        <span
                                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                        <span class="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                                    </span>
                                    {{ t('clients.detail.ready') }}
                                </span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>