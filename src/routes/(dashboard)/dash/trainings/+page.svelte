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

</script>
<svelte:head>
  <title> LOSF Conference | Dashboard Training</title>
</svelte:head>

<div class="flex-grow">
    <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
      <h1 class="mx-10 p-5 mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-xl dark:text-white">
        Trainings Details
      </h1>
      <div class="flex flex-wrap justify-center gap-4 p-5 text-center">
        <div class="flex-auto sm:w-max md:w-max">
          <h1 class="dark:text-white">Training Lessons</h1>
          <br />
          <Table>
            <TableHead>
              <TableHeadCell>Trainings name</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
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
        </div>
      </div>
    </div>
</div>