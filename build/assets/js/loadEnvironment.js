let envs = Object.keys(env);

for (let i = 0; i <= envs.length; i++) {
    window[envs[i]] = env[envs[i]];
}
