<script lang="ts">
    export let name: string = "Kunda Kinte"
</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        .dancing-script {
            font-family: 'Dancing Script', cursive;
        }
        .roboto {
            font-family: 'Roboto', sans-serif;
        }
        .border-custom {
             border: 6px solid #6b7280; /* Tailwind gray-500 */
        }
    </style>
</svelte:head>

<div class="bg-gray-100 flex items-center justify-center p-4">
    <div id="certificate-content" class="bg-white rounded-lg shadow-xl border-custom w-full max-w-2xl p-6 md:p-8">
        <div class="text-center mb-6">
            <h1 class="text-3xl md:text-4xl dancing-script text-orange-600 mb-2">Certificate of Membership</h1>
            <p class="text-lg roboto text-gray-700">This certificate is presented to</p>
        </div>

        <div class="text-center mb-8">
            <h2 class="text-2xl md:text-3xl roboto font-semibold text-black-700 mb-2">
                {name}
            </h2>
            <p class="text-md md:text-lg roboto text-gray-600">For valued membership in</p>
            <p class="text-xl md:text-2xl roboto font-medium text-orange-600">
                Living Open Source Foundation            
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-center">
            <div>
                <p class="text-sm roboto text-gray-500">Date Issued:</p>
                <p class="text-base md:text-lg roboto font-medium">[Issue Date]</p>
            </div>
            <div>
                <p class="text-sm roboto text-gray-500">Membership ID:</p>
                <p class="text-base md:text-lg roboto font-medium">[Membership ID]</p>
            </div>
        </div>

        <div class="flex justify-between items-center mt-6 md:mt-8">
            <div class="text-center">
                <p class="text-sm roboto text-gray-500">Authorized Signature:</p>
                <div class="border-b-2 border-gray-400 w-32 mx-auto mt-2"></div>
                <p class="text-base roboto">[Signatory Name/Title]</p>
            </div>
            <div class="text-center">
                 <img src="/LOSF Orange.png" alt="Organization Seal" class="rounded-full h-5">
            </div>
        </div>
    </div>
</div>
