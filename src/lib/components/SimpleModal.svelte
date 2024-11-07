<script>
    export let isOpen = false;
    export let closeModal;
  
    import AddItemForm from '$lib/components/AddItemForm.svelte';
  </script>
  
  {#if isOpen}
  <div 
    class="modal-background" 
    role="button" 
    tabindex="0" 
    on:click={closeModal}
    on:keydown={(e) => e.key === 'Enter' || e.key === 'Escape' ? closeModal() : null}
    aria-label="Close modal"
  >
    <div class="modal-content" on:click|stopPropagation>
      <AddItemForm closeModal={closeModal} />
    </div>
  </div>
{/if}

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 5px;
  }
</style>

  