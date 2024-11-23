<script lang="ts">
    import {
      Table,
      TableBody,
      TableBodyCell,
      TableBodyRow,
      TableHead,
      TableHeadCell
    } from 'flowbite-svelte';
    const trainings: {
        amount: string;
        title: string;
        brief: string;
        description: string[];
    }[] = [];
    import {onMount} from 'svelte';
    import { showLOSFPdf } from '$lib/utils';

    onMount(async () => {
      const pdfData = await showLOSFPdf('https://pdf-lib.js.org/assets/with_update_sections.pdf');
      renderPDF(pdfData);
    });

    async function renderPDF(pdfBytes: Uint8Array) {
      // Create a Blob from the PDF bytes
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

        /* var pdfViewer = new PdfViewer({
          documentUrl: "https://pdf-lib.js.org/assets/with_update_sections.pdf",
          width: "80%",
          height: 720,
          resizable: true,
          language: "en-US",
          theme: "slate, classic-dark"
        }); */
    }

</script>
<svelte:head>
  <title> LOSF Conference | Knowledge Base</title>
  <script src="https://mozilla.github.io/pdf.js/build/pdf.mjs" type="module"></script>

  <script type="module">
    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
    var url = 'https://training.linuxfoundation.org/wp-content/uploads/2019/04/LFCS-Study-Guide-v1.1.pdf';
  
    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    var { pdfjsLib } = globalThis;
  
    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.mjs';
  
    // Asynchronous download of PDF
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      console.log('PDF loaded');
  
      // Fetch the first page
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function(page) {
        console.log('Page loaded');
  
        var scale = 1.5;
        var viewport = page.getViewport({scale: scale});
  
        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log('Page rendered');
        });
      });
    }, function (reason) {
      // PDF loading error
      console.error(reason);
    });
  </script>
</svelte:head>

<div class="flex-grow">
    <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
      <h1 class="mx-10 p-5 mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-xl dark:text-white">
        Knowledge Base Documents
      </h1>
      <div class="flex flex-wrap justify-center gap-4 p-5 text-center">
        <div class="flex-auto sm:w-max md:w-max">
          <h1 class="dark:text-white">Documents</h1>
          <br />
          <Table>
            <TableHead>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
              {#each trainings as item, i}
                <TableBodyRow>
                  <TableBodyCell>{item.title}</TableBodyCell>
                  <TableBodyCell>{item.amount}</TableBodyCell>
                </TableBodyRow>
              {/each}
            </TableBody>
          </Table>
        </div>
        <div class="flex-auto w-14">
          <h1 class="dark:text-white">
            You don't have active trainings
          </h1>
          <br />
            <div class="flex justify-center">
              <enhanced:img src="/src/lib/assets/images/404.svg" alt="error" />
            </div>
            <canvas id="the-canvas"></canvas>
        </div>
      </div>
    </div>
</div>