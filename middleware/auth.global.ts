export default defineNuxtRouteMiddleware(async(to, from) => {
    const user = await getCurrentUser()

    if(user && to.name === 'login') {
        return navigateTo('/')
    }

    if(!user && to.name !== 'login' && to.name !== 'register' && to.name !== 'restore') {
        return navigateTo('/login')
    }

})