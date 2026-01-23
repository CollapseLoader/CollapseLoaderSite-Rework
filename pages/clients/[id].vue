<script setup lang="ts">
import { Play, Download, ArrowLeft, ShieldCheck, Rocket, Search, Github } from 'lucide-vue-next'

const route = useRoute()
const clientId = route.params.id as string

const { data: client, error } = await useFetch<any>(`https://api.collapseloader.org/clients/${clientId}`)

const { t } = useI18n();

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
    <div v-if="client" class="bg-base-200 min-h-screen">
        <div class="relative h-[40vh] w-full overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-primary/20 to-base-200"></div>
            <div class="absolute inset-0 bg-grid-white/[0.05]"></div>
            <div class="container mx-auto px-6 h-full flex items-end pb-12">
                <div class="flex flex-col md:flex-row md:items-center gap-6 w-full relative z-10">
                    <div
                        class="w-24 h-24 md:w-32 md:h-32 rounded-3xl glass-card flex items-center justify-center text-primary shadow-2xl">
                        <Rocket class="w-12 h-12 md:w-16 md:h-16" />
                    </div>
                    <div class="flex-grow">
                        <NuxtLink to="/clients" class="text-primary hover:underline flex items-center gap-2 mb-2">
                            <ArrowLeft class="w-4 h-4" /> {{ t('clients.back_to_library') }}
                        </NuxtLink>
                        <h1 class="text-4xl md:text-6xl font-black">{{ client.name }}</h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-6 py-12">
            <div class="grid lg:grid-cols-12 gap-12">
                <div class="lg:col-span-8 space-y-12">
                    <section class="glass-card p-8 rounded-3xl">
                        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Search class="text-primary" /> {{ t('clients.detail.description_title') }}
                        </h2>
                        <p class="text-xl text-base-content/70 leading-relaxed">
                            {{ t('clients.detail.description_paragraph', {
                                version: client.version, type:
                                    client.client_type
                            }) }}
                        </p>
                    </section>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div v-for="stat in [
                            { l: t('clients.detail.stats.downloads'), v: client.downloads, i: Download },
                            { l: t('clients.detail.stats.version'), v: client.version, i: ShieldCheck },
                            { l: t('clients.detail.stats.type'), v: client.client_type, i: Github },
                            { l: t('clients.detail.stats.status'), v: client.working ? t('clients.detail.status_ok') : t('clients.detail.status_error'), i: ShieldCheck },
                        ]" :key="stat.l" class="glass-card p-6 rounded-2xl text-center">
                            <component :is="stat.i" class="w-5 h-5 mx-auto mb-2 text-primary" />
                            <div class="text-xs font-bold text-base-content/40 uppercase tracking-tighter">{{ stat.l }}
                            </div>
                            <div class="text-lg font-bold">{{ stat.v }}</div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-4">
                    <div class="sticky glass-card rounded-[2.5rem] p-8 border-primary/20 overflow-hidden group">
                        <div class="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[60px] transition-colors">
                        </div>

                        <h3 class="text-2xl font-bold mb-6">{{ t('clients.detail.launch') }}</h3>

                        <button @click="launchClient"
                            class="btn btn-primary btn-lg w-full rounded-2xl h-16 group/btn overflow-hidden relative">
                            <Play class="fill-current" /> {{ t('clients.detail.launch_now') }}
                        </button>

                        <div class="mt-8 space-y-4">
                            <div class="flex items-center justify-between text-sm glass-card p-4 rounded-xl">
                                <span class="text-base-content/50">{{ t('clients.detail.loader_status') }}</span>
                                <span class="flex items-center gap-2 text-success">
                                    <span class="w-2 h-2 rounded-full bg-success animate-pulse"></span> {{
                                        t('clients.detail.ready') }}
                                </span>
                            </div>
                        </div>

                        <div class="divider text-xs opacity-20 uppercase font-black tracking-[0.2em]">{{
                            t('clients.detail.safety') }}</div>
                        <p class="text-[10px] text-base-content/40 text-center leading-relaxed">
                            {{ t('clients.detail.safety_desc') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>