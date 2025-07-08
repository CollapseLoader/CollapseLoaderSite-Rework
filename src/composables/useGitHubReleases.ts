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

    async function fetchLatestRelease(): Promise<void> {
        latestReleaseLoaded.value = false;
        try {
            const data: GitHubRelease = await fetchJSON(`${repoUrl}/releases/latest`);
            latestReleaseUrl.value = data?.assets?.[0]?.browser_download_url ?? '';
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
        error,
        refetch: () => Promise.all([fetchLatestRelease(), fetchLatestPrerelease()])
    };
}
