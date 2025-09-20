import { ref, onMounted } from 'vue';

interface GitHubRelease {
    tag_name: string;
    name: string;
    prerelease: boolean;
    assets: Array<{
        browser_download_url: string;
        name: string;
    }>;
}

export function useGitHubReleases(repoUrl: string) {
    const latestReleaseUrl = ref<string>('');
    const latestReleaseLoaded = ref(false);
    const latestPrereleaseUrl = ref<string>('');
    const latestPrereleaseLoaded = ref(false);
    const error = ref<string | null>(null);

    const latestLinuxAppImageUrl = ref<string>('');
    const latestLinuxDebUrl = ref<string>('');
    const latestPreLinuxAppImageUrl = ref<string>('');
    const latestPreLinuxDebUrl = ref<string>('');

    async function fetchJSON(url: string): Promise<any> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            console.error('Error fetching JSON:', err);
            throw err;
        }
    }

    function pickLinuxAssets(assets: GitHubRelease['assets'] | undefined) {
        const result = {
            appImage: '',
            deb: '',
        };
        if (!assets) return result;
        for (const a of assets) {
            const name = a?.name?.toLowerCase?.() || '';
            if (!result.appImage && name.endsWith('.appimage')) {
                result.appImage = a.browser_download_url;
            }
            if (!result.deb && name.endsWith('.deb')) {
                result.deb = a.browser_download_url;
            }
        }
        return result;
    }

    async function fetchLatestRelease(): Promise<void> {
        latestReleaseLoaded.value = false;
        try {
            const data: GitHubRelease = await fetchJSON(`${repoUrl}/releases/latest`);
            latestReleaseUrl.value = data?.assets?.[0]?.browser_download_url ?? '';
            const linux = pickLinuxAssets(data?.assets);
            latestLinuxAppImageUrl.value = linux.appImage;
            latestLinuxDebUrl.value = linux.deb;
        } catch (err) {
            error.value = 'Failed to fetch latest release';
            console.error('Failed to fetch latest release:', err);
        } finally {
            latestReleaseLoaded.value = true;
        }
    }

    async function fetchLatestPrerelease(): Promise<void> {
        latestPrereleaseLoaded.value = false;
        try {
            const data: GitHubRelease[] = await fetchJSON(`${repoUrl}/releases`);
            const latestPrerelease = Array.isArray(data)
                ? data.find((release) => release.prerelease)
                : null;
            latestPrereleaseUrl.value = latestPrerelease?.assets?.[0]?.browser_download_url ?? '';
            const linux = pickLinuxAssets(latestPrerelease?.assets);
            latestPreLinuxAppImageUrl.value = linux.appImage;
            latestPreLinuxDebUrl.value = linux.deb;
        } catch (err) {
            error.value = 'Failed to fetch latest prerelease';
            console.error('Failed to fetch latest prerelease:', err);
        } finally {
            latestPrereleaseLoaded.value = true;
        }
    }

    onMounted(async () => {
        await Promise.all([
            fetchLatestRelease(),
            fetchLatestPrerelease()
        ]);
    });

    return {
        latestReleaseUrl,
        latestReleaseLoaded,
        latestPrereleaseUrl,
        latestPrereleaseLoaded,
        latestLinuxAppImageUrl,
        latestLinuxDebUrl,
        latestPreLinuxAppImageUrl,
        latestPreLinuxDebUrl,
        error,
        refetch: () => Promise.all([fetchLatestRelease(), fetchLatestPrerelease()])
    };
}
