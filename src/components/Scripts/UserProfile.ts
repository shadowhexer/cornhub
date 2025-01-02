import Products from '@/components/Scripts/Products';
import Default from '@/assets/default.png';
import { computed, reactive, ref, type ComputedRef } from 'vue';
import API from '@/services/api'

type Profile = {
    coverPhoto: string | null,
    profilePhoto: string | null,
};

type Status = {
    logged_in: ComputedRef<boolean>;
    name: string;
    role: string;
};

const profile = reactive({
    profile: {
        coverPhoto: '',
        profilePhoto: Default,
    } as Profile
})

const isLogin = reactive<Status>({
    logged_in: '' as unknown as ComputedRef<boolean>,
    name: '' as string,
    role: '' as string,
});
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const image = localStorage.getItem(`Image_${i}`);

    if (i === 0 || key as string === image) {
        profile.profile.coverPhoto = image as string;
    }
    else if (i === 1 || key as string === image) {
        profile.profile.profilePhoto = image as string;
    }
}

export default { Products, profile, isLogin }