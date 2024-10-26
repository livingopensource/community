<script>
    import { Card } from 'flowbite-svelte';
    const certifications = [
        {
            "image": "src/lib/assets/images/certifications/Certified-Linux-Associate.webp",
            "title": "Certified Linux Associate",
            "description": "This certification validates fundamental Linux skills, including basic installation, configuration, and maintenance tasks. It demonstrates competency in working with Linux command line utilities, understanding file systems, managing users and groups, and performing basic system administration tasks."
        },
        {
            "image": "src/lib/assets/images/certifications/Linux-Foundation-Certified-System-Administrator.webp",
            "title": "Linux Foundation Certified System Administrator",
            "description": "This certification goes beyond the basics and focuses on practical skills required for Linux system administration in professional environments. It covers topics such as system architecture, system installation and package management, GNU and Unix commands, devices, file systems, and security."
        },
        {
            "image": "src/lib/assets/images/certifications/KCNA_badge.webp",
            "title": "Kubernetes and Cloud Native Certified Associate",
            "description": "This certification focuses on cloud-native technologies with a particular emphasis on Kubernetes. It covers core concepts of Kubernetes, container orchestration, deploying applications, and managing containers in cloud environments. It validates proficiency in deploying and managing containerized applications using Kubernetes."
        },
        {
            "image": "src/lib/assets/images/certifications/kubernetes-ckad-color-1024x1003-1.webp",
            "title": "Certified Kubernetes Application Developer",
            "description": "This certification is aimed at developers who work with Kubernetes. It validates skills in designing, building, configuring, and exposing cloud-native applications for Kubernetes. It covers topics such as containerizing applications, configuring networking, managing application lifecycle, and troubleshooting."
        },
        {
            "image": "src/lib/assets/images/certifications/Certified-Kubernetes-Administrator.webp",
            "title": "Certified Kubernetes Administrator",
            "description": "This certification is designed for system administrators who deploy, maintain, and troubleshoot Kubernetes clusters. It validates skills in various aspects of Kubernetes administration, including cluster architecture, installation and configuration, networking, security, and troubleshooting. It demonstrates expertise in managing production Kubernetes environments."
        }
    ];
</script>

<div class="flex-grow">
    <div class="flex flex-col justify-center items-center px-6 mx-auto xl:px-0">
        <h1 class="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Get Certified
        </h1>
		<div class="flex justify-center flex-wrap gap-3 p-5">
			{#each certifications as certification}
                <Card img={certification.image}>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {certification.title}
                    </h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
                        {certification.description}
                    </p>
                </Card>
            {/each}
		</div>
        <p class="mt-15 mb-5 text-base font-normal text-gray-500 dark:text-gray-400 md:text-lg">
            Level Up
        </p>
	</div>
</div>

