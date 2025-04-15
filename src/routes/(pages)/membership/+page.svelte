<script>
    import { Card, Badge, A, Button } from 'flowbite-svelte';

    let { data } = $props();

    const certifications = [
        {
            "amount": "$ 20/year",
            "title": "Explorer",
            "brief": "This tier is perfect for those starting their journey in the open-source world or looking to stay informed about industry developments.",
            "description": [
                "Access to open-source resources and repositories",
                "Monthly updates on industry news and trends",
                "Participation in professional online forums",
                "Discounts on training courses, webinars, and events",
                "Opportunity to join live sessions on requested topics"
            ]
        },
        {
            "amount": "$ 50/year",
            "title": "Developer",
            "brief": "Ideal for professionals seeking to deepen their expertise and expand their network within the open-source community.",
            "description": [
                "All Explorer tier benefits",
                "Access to exclusive webinars and virtual workshops",
                "Free or discounted entry to conferences and networking events",
                "Priority access to new open-source project releases",
                "Opportunities to contribute to high-profile open-source projects",
                "Reduced rates for Linux certification courses "
            ]
        },
        {
            "amount": "$ 100/year",
            "title": "Professional",
            "brief": "This tier is designed for individuals aiming for significant career advancement, offering tailored support and recognition.",
            "description": [
                "All Professional benefits",
                "One-on-one mentorship sessions with experienced IT professionals",
                "Personalized career development plans and guidance",
                "Recognition as a Premium Member on the LOS website "
            ]
        },
        {
            "amount": "$ 200/year",
            "title": "Executive",
            "brief": "For those who seek an elite experience, this tier offers unmatched access to premium resources, top-tier networking opportunities, and direct engagement with industry pioneers.",
            "description": [
                "All Executive tier benefits",
                "Exclusive live sessions with renowned instructor Sander Van Vugt",
                "Early access to high-level training and certification programs",
                "VIP invitations to global open-source conferences and events",
                "Personalized introductions to industry leaders and experts",
                "Priority support and direct access to the Foundation’s leadership team"
            ]
        }
    ];
</script>

<svelte:head>
  <title> LOSF Community | Memberships </title>
</svelte:head>

<div class="flex-grow">
    <div class="flex flex-col justify-center items-center px-6 mx-auto xl:px-0">
        <h1 class="p-5 mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Membership
        </h1>
        <div class="flex justify-center flex-wrap gap-3 p-5">
            <p class="mx-10 mt-15 mb-5 text-base font-normal text-gray-500 dark:text-gray-400 md:text-lg">
                Becoming a member of the Living Open Source Foundation is more than just joining a community; it’s about being part of a movement dedicated to advancing technology and open-source initiatives across Africa and beyond. Our membership offers unparalleled opportunities for professional growth, skill enhancement, and networking, all while contributing to meaningful social impact. With various membership tiers available, there’s a perfect fit for everyone, each designed to provide maximum value at an affordable cost.
            </p>
        </div>
		<div class="flex justify-center flex-wrap gap-3 p-5">
			{#each data.memberships as certification}
                <Card href="/dash/membership?type={certification.name}" class="relative">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {certification.name}
                    </h5>
                    <p class="mb-5 p-5 font-xs text-gray-700 dark:text-gray-400">
                        {certification.subTitle}
                    </p>
                    <Badge rounded large color="dark" class="text-2xl font-bold">{certification.amount}</Badge>
                    <p class="mt-5 font-normal text-gray-700 dark:text-gray-400">
                        {certification.description}
                    </p>
                    <br />
                    <Button outline pill size="sm" class="absolute bottom-1 right-5">
                        Subscribe
                    </Button>
                </Card>
            {/each}
		</div>
	</div>
</div>

