import Swal from 'sweetalert2';

const showAlert = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your item has been deleted.',
        'success'
      );
    }
  });
};

const App = () => {
  return (
    <button onClick={showAlert}>Delete Item</button>
  );
};

export default App;
